require(`../testRequisites`);
const index = require(`../../index`);

describe('asyncLoop', () => {
    before(() => {
        console.log('* asyncLoop ->');
    });

    it('should not be an array (error)', () => {
        //calling loop each function
        index.each({}, 'data');
        return new Promise((resolve, reject) => {
            //registering event listener
            index.on(err => {
                if (err)
                    resolve(err); //there should be an error
                else
                    reject();
            });
        }).then((result) => {
            //if promise is resolved that means there is an error (i.e. our test succeeds)
            result.should.be.equal('provided data is not an array');
        });
    });

    it('should be an error in between loop (error)', () => {
        return new Promise((resolve, reject) => {
            //there is no path like hello so there will be an error from read file functions
            let array = ['./extras/utils.js', 'hello'];
            //calling loop each fn
            index.each(array, elem => {
                require('fs').readFile(elem, function (err, resp) {
                    if (err)
                        index.next(err);
                    else
                        index.next();
                })
            });
            //registering event listener
            index.on(err => {
                if (err)
                    resolve(err);
                else
                    reject();
            });

        }).then((result) => {
            //if promise is resolved that means there is an error (i.e. our test succeeds)
        })
    });

    it('should be success for async file reading (success)', () => {
        return new Promise((resolve, reject) => {
            let array = ['./extras/utils.js', './extras/constants.js'];
            index.each(array, elem => {
                require('fs').readFile(elem, 'UTF-8', function (err, resp) {
                    if (err)
                        index.next(err);
                    else
                        index.next();

                })
            });

            index.on(err => {
                //our error should be undefined for successful completion
                if (!err)
                    resolve();
                else
                    reject();
            });
        }).then(() => {
            //should be resolved if we read all conditions
        })
    });
});