/**
 *
 *
 */
define(['math'], function (Math) {

    /**
     * Class used to define the sub-branch of a snowflake branch
     *
     * Creates a new snowflake branch's SubBranch, using details of which sub-branch number it is, and the number of sub
     * branches there will be to create the angle and length
     *
     * @name Snowflake.SubBranch
     * @class Snowflake.SubBranch
     * @constructor
     *
     * @param {int} subBranchNumber     Number of the sub-branch, with 1 being the outermost, and counting up as you
     *                                  move inwards
     * @param {Snowflake.Branch} branch Branch that this sub-branch will be added to
     */
    var SubBranch = function (subBranchNumber, branch) {
        this.angle = Math.getRandomNumber(5, 80);
        this.length = Math.getRandomNumber(1, 10);
    };

    return SubBranch;
});