const debounce = (callback, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    }
}


// const functionWithCallback = (callback) => {
//     callback();
// }

// const actualCallback = (a, b) => {
//     console.log("callback called with args ", a, b);
// }

// const callbackWrapper = (func) => {
//     return () => {
//         console.log("---------");
//         func();
//         console.log("---------");
//     }
// }

// functionWithCallback(callbackWrapper(actualCallback.bind(null, 1, 2)));
