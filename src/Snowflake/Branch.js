/**
 * Class used to define the branch of a snowflake
 * @class Snowflake/Branch
 */
define(['Math', 'Snowflake/SubBranch'], function (Math, SubBranch) {

    /**
     * Generates a random pattern for each different
     *
     * @param {int} branchLength The length of the branch
     *                           This is used to calculate the available space
     *
     * @return {void}
     */
    function generateSubBranches(branchLength) {

        var subBranchCount, subBranch;

        // Chances of sub-branch numbers
        // 1 branch: 10%
        // 2 branch: 55% (65%)
        // 3 branch: 35% (100%)
        var branchRandomiser = Math.getRandomNumber(1, 100);

        if (branchRandomiser <= 10) {
            subBranchCount = 1;
        } else if (branchRandomiser <= 65) {
            subBranchCount = 2;
        } else {
            subBranchCount = 3;
        }

        this.subBranches = [];

        do {
            subBranch = new SubBranch(this, subBranchCount - this.subBranches.length);
            this.subBranches.unshift(subBranch);
        } while (this.subBranches.length < subBranchCount);
    }


    /**
     * Prepares a random pattern for the branch of a snowflake
     *
     * @name Snowflake.Branch
     * @class Snowflake.Branch
     * @constructor
     *
     * @property {number} scopeAngle                 Angle, in radians, available for the branch
     * @property {int}    length                     Length of the branch
     * @property {Snowflake.SubBranch[]} subBranches Array of sub-branch objects
     *
     * @param {number} scopeAngle Degrees that the branch needs to sit within 3 degrees will be removed from each side
     *                            to leave a gap between branches
     *                            This number should already include any spacing between branches
     */
    var Branch = function (scopeAngle) {

        this.scopeAngle = scopeAngle;
        this.length = Math.getRandomNumber(100, 150);

        generateSubBranches.call(this, this.length);

        for (var i = 0; i < this.subBranches.length; i++) {
            console.log(this.subBranches[i]);
        }
    };

    return Branch;
});