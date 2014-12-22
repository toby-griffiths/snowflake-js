define(function () {

    /**
     * Generates a random number between min and max, inclusive
     * @param {int} min
     * @param {int} max
     * @return {number}
     *
     * @todo Move to own module
     */
    Math.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * ((max + 1) - min) + min);
    };


    /**
     * Returns an array containing the common denominators for a given number
     * @param {int} number Number to work out the common denominators for
     * @return {Array|int[]}
     */
    Math.getCommonDenominators = function (number) {

        var denominators = [];

        for (var i = 1; i <= number / 2; i++) {
            if ((number % i) === 0) {
                denominators.push(i);
            }
        }

        return denominators;
    };

    return Math;
});