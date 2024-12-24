const EventEmitter = require("events");

class ReactiveProcessor extends EventEmitter {
    processData(dataArray) {
        let completedCount = 0;

        dataArray.forEach((item, index) => {
            setTimeout(() => {
                if (item % 2 === 0) {
                    this.emit("success", `Item ${item} processed successfully!`);
                } else {
                    this.emit("error", `Error processing item ${item} at index ${index}`);
                }

                completedCount++;
                if (completedCount === dataArray.length) {
                    this.emit("complete", "All items processed.");
                }
            }, Math.random() * 1000); 
        });
    }
}

const processor = new ReactiveProcessor();

processor.on("success", (message) => {
    console.log("Success:", message);
});

processor.on("error", (message) => {
    console.error("Error:", message);
});

processor.on("complete", (message) => {
    console.log("Complete:", message);
});

const dataToProcess = [1, 2, 3, 4, 5, 6, 7, 8];

console.log("Starting processing...");
processor.processData(dataToProcess);
