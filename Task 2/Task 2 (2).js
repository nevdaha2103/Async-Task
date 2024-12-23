function processArrayWithPromises(array, callback) {
    const promises = array.map((item) => callback(item));  
    return Promise.all(promises);  
}

async function runDemo() {

    const numbers1 = [1, 2, 3, 4, 5];

    const multiplyByThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 3), Math.random() * 1000); 
        });
    };

    try {
        const results1 = await processArrayWithPromises(numbers1, multiplyByThree);  
        console.log( results1);  
    } catch (error) {
        console.error( error); 
    }

    const numbers2 = [10, 20, 30];

    const squareNumber = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * num), Math.random() * 1000); 
        });
    };

    try {
        const results2 = await processArrayWithPromises(numbers2, squareNumber); 
        console.log(results2); 
    } catch (error) {
        console.error(error);  
    }
}

runDemo();
