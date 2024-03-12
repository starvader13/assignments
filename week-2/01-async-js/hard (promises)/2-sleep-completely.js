/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    return new Promise((resolve, reject)=>{
        let startTime = Date.now();
        let endTime = Date.now();
        while(true){
            if((endTime-startTime)>=milliseconds){
                resolve();
                break;
            }
            endTime = Date.now();   
        }
    })
}

sleep(1000);

module.exports = sleep;
