async function* processDataAsyncIterator(data, processItem) {
    for (let i = 0; i < data.length; i++) {
        yield await processItem(data[i]);
    }
}

function promiseMap(data, processItem, signal) {
    const promises = data.map((item) => {
        if (signal.aborted) {
            return Promise.reject(new DOMException("Aborted", "AbortError"));
        }

        return new Promise((resolve, reject) => {
            const onAbort = () => reject(new DOMException("Aborted", "AbortError"));
            signal.addEventListener("abort", onAbort, { once: true });

            processItem(item)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    signal.removeEventListener("abort", onAbort);
                });
        });
    });

    return Promise.all(promises);
}

async function processLargeDataSet() {
    const controller = new AbortController();
    const { signal } = controller;

    const largeDataSet = Array.from({ length: 100000 }, (_, i) => i + 1); 

    const multiplyByThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000);
        });
    };

    try {
        const iterator = processDataAsyncIterator(largeDataSet, multiplyByThree);

        for await (const result of iterator) {
            console.log(result);
        }
    } catch (error) {
        console.error(error);
    }

    setTimeout(() => {
        controller.abort();
    }, 2000);
}

processLargeDataSet().then(() => {
    console.log("Processing large data completed successfully.");
}).catch((error) => {
    console.error("Error during large data processing:", error);
});
