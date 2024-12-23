async function asyncFind(array, asyncCallback) {
    for (let item of array) {
        if (await asyncCallback(item)) {
            return item; 
        }
    }
    return undefined; 
}

const numbers = [1, 2, 3, 4, 5];

async function isGreaterThanThree(number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(number > 3);
        }, 100);
    });
}

asyncFind(numbers, isGreaterThanThree).then((result) => {
    console.log('Async find result:', result); 
});
