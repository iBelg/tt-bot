const random = require('random');

module.exports = {
    randomNumber: (minNumber, maxNumber) => {
        return random.int(minNumber, maxNumber);
    }
};
