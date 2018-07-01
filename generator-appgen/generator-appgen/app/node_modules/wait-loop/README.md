
# wait-loop
[![NPM](https://nodei.co/npm/wait-loop.png)](https://nodei.co/npm/wait-loop/)
[![Build Status](https://travis-ci.org/DawnImpulse/wait-loop.svg?branch=master)](https://travis-ci.org/DawnImpulse/wait-loop) [![GitHub issues](https://img.shields.io/github/issues/DawnImpulse/wait-loop.svg)](https://github.com/DawnImpulse/wait-loop/issues)
[![npm version](https://badge.fury.io/js/wait-loop.svg)](https://badge.fury.io/js/wait-loop) ![npm](https://img.shields.io/npm/dt/wait-loop.svg)

> **wait-loop** helps to synchronize each async loop call for an array . **wait-loop** works on 'deasync' nodejs event loop blocking mechanism.

A problem arises when we wish to iterate an array and perform an async task on each element but we wish to call next
iteration only after first one is finished working.

`wait-loop` helps in this regard by using node events & deasync event blocking to achieve a synchronous work.

> Note : The following module is helpful for those who are yet to work with bluebird promises as `.each` method in bluebird is good solution for this problem.

To achieve our goal we will use following function -

+ `each` function
    ~~~~~
    each(array,task)
    ~~~~~
    + `array` - is the array of elements on which our loop will work
    + `task` - the function inside which user performs the async task ,there will be two params provided by it. 
        + `element` - element (which is the current array element)
        + `position` - the current index  (you can avoid it if you don't want it)
    + **next()** function is used to switch to next iteration , if there is an error call **next(err)**
    + **on(func)** function will create an active listener which will fire after either all iterations are completed or an error occurred.
        + `func(error)` - it is a function as parameter inside **on**
            + `error` - if the loop succeeds the error will be undefined else it will contain the error 
         
 > Note : Although the **on** is internally using node events but you can start listening to it before or after **each** function. This is due to the internal module(_wait-loop_) handling which will only starts the work after the listener (**on**) is attached.
        
### Example -
~~~~   
    var loop = require('wait-loop');

    loop.each(array, function(elem) {
    
        //an async call to read a file
        require('fs').readFile(elem, 'UTF-8', (err, resp) => {
       
            //call next(err) if there is an error
            if (err)
                loop.next(err); 
            else
                loop.next();
                
        }); //end of read file
    }); //end of loop.each
    
    loop.on(err => {
    //our error should be undefined for successful completion
        if (err)
            //there is an error
        else
            //successfully executed
    });
~~~~

### Versions
+ `v1.0.0` 

    + Initial release - containing the basic `each` function only.

### Upcoming
+ A new complete synchronous function without event listener utilizing try/catch

### Special Thanks
+ [Deasync](https://www.npmjs.com/package/deasync)
> Pull requests are always welcomed (kindly sign commits with GPG keys. **THANKS**)

### Contact
+ Twitter - [@dawnimpulse](https://twitter.com/dawnimpulse)

### License (ISC)

~~~~
ISC Licence

Copyright 2018 Saksham (DawnImpulse)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE
OR PERFORMANCE OF THIS SOFTWARE.
~~~~