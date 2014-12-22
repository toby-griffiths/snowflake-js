define(['Math', 'Snowflake/Branch'], function (Math, Branch) {

    window.SnowflakeJS = window.SnowflakeJS || {
        uniqueSnowflakes: []
    };

    /**
     * Generates the pattern for each branch
     * Uses the number of branchCount to calculate the angle between branchCount, and therefore the space available for the
     * branch
     * @param {int} branchCount
     * @return {Array} Returns an array of pattern parameters
     */
    function generateBranchPatterns(branchCount) {

        var angle = (360 / branchCount) - 6;
        var patternCount = generatePatternCount(branchCount);
        var branchPatterns = [];
        var branches = [];

        do {
            branchPatterns.push(new Branch(angle));
        } while (branchPatterns.length < patternCount);

        console.log('No of patterns: ', branchPatterns.length);

        do {
            console.log('Adding pattern ', branches.length % branchPatterns.length);
            branches.push(branchPatterns[branches.length % branchPatterns.length]);
        } while (branches.length < branchCount);

        return branches;
    }


    /**
     * Picks a random number of different patterns the snowflake branches will have based on the number of branches
     * @param {int} branches Number of branches snowflake has
     * @return {int} Returns the number of different branch patterns to select given the number of branches
     */
    function generatePatternCount(branches) {

        var possiblePatternCounts= Math.getCommonDenominators(branches);

        return possiblePatternCounts[Math.getRandomNumber(1, possiblePatternCounts.length) - 1];
    }


    /**
     * Snowflake class
     * Each time you call new Snowflake, a unique set of settings is created to build the snowflake from
     * @constructor
     * @todo Update to check the existence of the random pattern in the register to allow each one to be unique
     */
    var Snowflake = function () {

        console.log(Math);

        this.branchCount = Math.getRandomNumber(5, 10);
        this.branches = generateBranchPatterns(this.branchCount);
    };

    return Snowflake;
});