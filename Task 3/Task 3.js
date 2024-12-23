function processArrayWithPromises(array, fn, signal) {
    const promises = array.map((item) => {
        if (signal.aborted) {
            return Promise.reject(new DOMException("Aborted", "AbortError"));
        }

        return new Promise((resolve, reject) => {
            const onAbort = () => reject(new DOMException("Aborted", "AbortError"));

            signal.addEventListener("abort", onAbort, { once: true });

            fn(item)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    signal.removeEventListener("abort", onAbort);
                });
        });
    });

    return Promise.all(promises);
}

function asyncFindIndex(array, searchValue, signal) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(array)) {
            return reject(new TypeError('First argument must be an array'));
        }
        if (typeof searchValue !== 'number') {
            return reject(new TypeError('Second argument must be a number'));
        }

        for (let i = 0; i < array.length; i++) {
            setTimeout(() => {
                if (signal.aborted) {
                    return reject(new Error('Operation aborted'));
                }
                if (array[i] === searchValue) {
                    resolve(i);
                }
                if (i === array.length - 1) {
                    resolve(-1);
                }
            }, 500);
        }
    });
}

async function demoFunc() {
    const controller = new AbortController();
    const { signal } = controller;

    const numbers = [1, 2, 3, 4, 5];
    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    try {
        const results1 = await processArrayWithPromises(numbers, promiseTriple, signal);
        console.log("Case 1 results:", results1);
    } catch (err) {
        if (err.name === "AbortError") {
            console.error("Case 1 was aborted");
        } else {
            console.error("Error:", err);
        }
    }

    setTimeout(() => {
        controller.abort();
    }, 2000);

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const searchValue = 8;

    try {
        const index = await asyncFindIndex(array, searchValue, signal);
        console.log("Case 2 - Found index:", index);
    } catch (err) {
        console.error("Case 2 Error:", err.message);
    }
}

demoFunc().then(() => {
    console.log("demoFunc completed successfully");
}).catch(err => {
    console.error("Error in demoFunc:", err);
});
