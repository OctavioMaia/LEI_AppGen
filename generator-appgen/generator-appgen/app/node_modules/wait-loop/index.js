const asyncLoop = require('./handler/asyncLoop');

/**
 * This is the main function which is used to for synchronization of async loop calls
 * The each function requires two params
 * @param array - is the array of elements on which our loop will work
 * @param task - the function which performs the async task
 *               The task provides two parameter -
 *               1. element (which is the current array element)
 *               2. position (the current index) - you can avoid it if you don't want
 * Since we are aiming for an synchronous behaviour so until an iteration completely succeeds it
 * won't move ahead , so for the module to know when the iteration completes, user need to call
 *
 * next() function - if there is an error in iteration call next(error)
 * After the complete loop is successful or even if there is an error the control will fall to
 *
 * to an event listener on() which will handle the error or success accordingly
 *
 */
exports.each = asyncLoop.each;


/**
 * next() function is used to move ahead with next iteration when an async task completes or
 * is used to let the module know if there is an error
 *
 * @param error - if there is an error the kindly provide the parameter otherwise let it remain empty
 */
exports.next = asyncLoop.next;

/**
 * on() is basically an event listener which will work after each succeeds or fails
 *
 * @param function - the function will have a single parameter inside it
 *                   1. error - if the loop succeeds the error will be undefined
 *                              else it will contain the error
 */
exports.on = asyncLoop.on;