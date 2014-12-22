/**
 * Class used to define the branch of a snowflake
 * @class Snowflake/Branch
 */
define(['Math', 'Snowflake/SubBranch'], function (Math, SubBranch) {

    /**
     * Generates a random pattern for each different
     * @param {int} scopeAngle Angle available for branch
     */
    function generateSubBranches(scopeAngle) {

        // Chances of sub-branch numbers
        // 1 branch: 10%
        // 2 branch: 55% (65%)
        // 3 branch: 35% (100%)
        var branchRandomiser = Math.getRandomNumber(1, 100);
        var subBranchCount;
        var subBranches = [];

        if (branchRandomiser <= 10) {
            subBranchCount = 1;
        } else if (branchRandomiser <= 65) {
            subBranchCount = 2;
        } else {
            subBranchCount = 3;
        }

        do {
            subBranches.push(new SubBranch(subBranchCount - subBranches.length, subBranches));
        } while (subBranches.length < subBranchCount);

        return subBranches;
    }


    /**
     * Prepares a random pattern for the branch of a snowflake
     * @param {int} scopeAngle Degrees that the branch needs to sit within 3 degrees will be removed from each side to
     *                         leave a gap between branches
     *                         This number should already include any spacing between branches
     * @constructor
     */
    var Branch = function (scopeAngle) {

        this.scopeAngle = scopeAngle;
        this.subBranches = generateSubBranches(this.scopeAngle);
        this.length = Math.getRandomNumber(100, 150);
    };

    return Branch;
});