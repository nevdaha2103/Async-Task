async function asyncFind(array, asyncCallback) {
    for (let item of array) {
        if (await asyncCallback(item)) {
            return item; 
        }
    }
    return undefined;
}

function debounceAsync(asyncFn, delay) {
    let timeout;
    return async function (...args) {
        if (timeout) clearTimeout(timeout);
        return new Promise((resolve) => {
            timeout = setTimeout(() => resolve(asyncFn(...args)), delay);
        });
    };
}

const numbers = [1, 2, 3, 4, 5];

async function isGreaterThanThree(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number > 4);
        }, 100); 
    });
}

const debouncedIsGreaterThanThree = debounceAsync(isGreaterThanThree, 300);

asyncFind(numbers, debouncedIsGreaterThanThree).then((result) => {
    console.log('Debounced async find result:', result); 
});
