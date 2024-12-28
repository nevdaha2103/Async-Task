function asyncFind(array, asyncCallback, finalCallback) {
    let index = 0;

    function iterate() {
        if (index >= array.length) {
            return finalCallback(null, undefined);
        }

        asyncCallback(array[index], (err, result) => {
            if (err) {
                return finalCallback(err); 
            }

            if (result) {
                return finalCallback(null, array[index]);
            }

            index++;
            iterate(); 
        });
    }

    iterate(); 
}

function debounceAsync(asyncFn, delay) {
    let timeout;
    return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            asyncFn(...args);
        }, delay);
    };
}

const numbers = [1, 2, 3, 4, 5];

function isGreaterThanThree(number, callback) {
    setTimeout(() => {
        callback(null, number > 4);
    }, 100);
}

const debouncedIsGreaterThanThree = debounceAsync(isGreaterThanThree, 300);

asyncFind(
    numbers,
    debouncedIsGreaterThanThree,
    (err, result) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Debounced async find result:', result);
        }
    }
);
