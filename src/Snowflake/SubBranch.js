/**
 * Class used to define the sub-branch of a snowflake branch
 *
 * @class Snowflake/SubBranch
 *
 * @property angle
 * @property length
 */
define(['math'], function (Math) {

    /**
     * Creates a new snowflake branch's SubBranch, using details of which sub-branch number it is, and the number of sub
     * branches there will be to create the angle and length
     * @param subBranchNumber
     * @param totalSubBranchCount
     * @constructor
     */
    var SubBranch = function () {
        this.angle = Math.getRandomNumber(5, 80);
        this.length = Math.getRandomNumber(1, 10);
    };

    return SubBranch;
});