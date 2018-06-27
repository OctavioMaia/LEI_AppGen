const EventEmitter = require('events');
const deasync = require('deasync');

//creating a MyEmitter class extending EventEmitter
class MyEmitter extends EventEmitter {
}

//creating an object of MyEmitter class
const myEmitter = new MyEmitter();

let wait = true; //used for deasync waiting
let error; //use to get an error in our loop
let isOn = false; //use to check if emit emitter is on before starting function
let isAttached = false; //use to check if function is added till now or not
let array, task;

//--------------------- Exports -------------------------
/**
 * Exported each function to start a loop for async tasks
 * @param arrayI
 * @param taskI
 */
exports.each = (arrayI, taskI) => {
    array = arrayI; //creating dynamic variables
    task = taskI;
    if (isOn) {
        each();
    } else {
        isAttached = true;
    }
};

/**
 * Used to move to next iteration or if error then finishing
 * @param err
 */
exports.next = (err) => {
    if (err)
        error = err;
    wait = false;
};

/**
 * exported listener when our loop finishes
 * @param func
 */
exports.on = (func) => {
    myEmitter.on('event', func);
    if (isAttached) {
        each();
    } else {
        isOn = true;
    }
};

//------------------- Private Functions --------------------

/**
 * Main each handler code
 */
function each() {
    try {
        //variable to determine whether loop successfully completed or not
        let loopSuccess = true;
        //check if provided array is of type ARRAY or not
        if (require('../extras/utils').typeOf(array) === require('../extras/constants').ARRAY) {
            //looping through our array
            for (let i = 0; i < array.length; i++) {
                //performing task providing element and/or its position
                void (task(array[i], i));
                //using deasync for blocking mechanism via event loop
                deasync.loopWhile(function () {
                    return wait
                });
                //resetting our wait flag
                wait = true;
                //checking if there is an error , then break our loop and emit event
                if (error) {
                    void (myEmitter.emit('event', error));
                    error = undefined; //resetting variable
                    [isAttached, isOn] = [false, false]; //resetting variables
                    loopSuccess = false;
                    break;
                }
            }
            if (loopSuccess) {
                //loop finishes successfully
                void (myEmitter.emit('event', undefined));
            }

        } else {
            //data type is not an array
            void (myEmitter.emit('event', `provided data is not an array`));
        }
    } catch (error) {
        void (myEmitter.emit('event', error));
    }
}