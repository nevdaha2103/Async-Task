function processArrayWithPromises(array, callback) {
    const promises = array.map(item => callback(item)); 
    return Promise.all(promises); 
}

async function demoFunc() {

    const numbers = [1, 2, 3, 4, 5];

    const promiseTriple = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000); 
        });
    };

    try {
        const results1 = await processArrayWithPromises(numbers, promiseTriple);
        console.log(results1); 
    } catch (error) {
        console.error('Error in case 1:', error); 
    }
    
    const numbers2 = [10, 20, 30];

    const promiseSquare = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * num), Math.random() * 1000);
        });
    };

    try {
        const results2 = await processArrayWithPromises(numbers2, promiseSquare);
        console.log(results2);
    } catch (error) {
        console.error('Error in case 2:', error);
    }
}

demoFunc();
