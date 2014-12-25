/**
 * Class used to define the branch of a snowflake
 * @class Snowflake/Branch
 */
define(['Math', 'Snowflake/SubBranch'], function (Math, SubBranch) {

    /**
     * Generates a random pattern for each different
     *
     * @param {int} scopeAngle   The angle that the sub-branches must fit within
     * @param {int} branchLength The length of the branch
     *                           This is used to calculate the available space
     *
     * @return {Snowflake.SubBranch[]} Returns an array of SubBranch objects, one for each branch of the snowflake
     */
    function generateSubBranches(scopeAngle, branchLength) {

        var subBranchCount;
        var subBranches = [];
        var subBranch;

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

        do {
            subBranch = new SubBranch(subBranchCount - subBranches.length, subBranches, scopeAngle / 2, branchLength);
            subBranches.unshift(subBranch);
        } while (subBranches.length < subBranchCount);

        return subBranches;
    }


    /**
     * Prepares a random pattern for the branch of a snowflake
     *
     * @name Snowflake.Branch
     * @class Snowflake.Branch
     * @constructor
     *
     * @param {int} scopeAngle Degrees that the branch needs to sit within 3 degrees will be removed from each side to
     *                         leave a gap between branches
     *                         This number should already include any spacing between branches
     */
    var Branch = function (scopeAngle) {

        this.scopeAngle = scopeAngle;
        this.length = Math.getRandomNumber(100, 150);
        this.subBranches = generateSubBranches(this.scopeAngle, this.length);
    };

    return Branch;
});