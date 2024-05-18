/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
*/

// Incorrect
// function wait1(t) {
//     return new Promise((resolve, reject) => {
//         function counter(count) {
//             if (count > 0) {
//                 setTimeout(() => {
//                     counter(count - 1);
//                 }, 1000);
//             }
//         }
//         counter(t);
//         resolve();
//     });
// }

// function wait2(t) {
//     return new Promise((resolve, reject) => {
//         function counter(count) {
//             if (count > 0) {
//                 setTimeout(() => {
//                     counter(count - 1);
//                 }, 1000);
//             }
//         }
//         counter(t);
//         resolve();
//     });
// }

// function wait3(t) {
//     return new Promise((resolve, reject) => {
//         function counter(count) {
//             if (count > 0) {
//                 setTimeout(() => {
//                     counter(count - 1);
//                 }, 1000);
//             }
//         }
//         counter(t);
//         resolve();
//     });
// }


// corrected one

function wait1(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    });
}

function wait2(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    });
}

function wait3(t) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, t * 1000);
    });
}

function calculateTime(t1, t2, t3) {
    let currTime = Date.now();
    return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(() => {
        let afterTime = Date.now();
        return afterTime - currTime;
    });
}


function calculateTime(t1, t2, t3) {
    let currTime = Date.now();
    return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then(() => {
        let afterTime = Date.now();
        return afterTime - currTime;
    });
}


calculateTime(1, 2, 3).then(data => {
    console.log(data);
});

module.exports = calculateTime;



// calculateTime(1, 2, 3).then(data => {
//     console.log(data);
// })

module.exports = calculateTime;