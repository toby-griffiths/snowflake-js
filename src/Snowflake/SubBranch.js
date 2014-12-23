/**
 *
 *
 */
define(['jquery'], function ($) {

    /**
     * Generates a random angle based on the sub-branch number and the existing sub branches
     *
     * @param subBranches
     * @param subBranchNumber
     */
    function getAngle(subBranches, subBranchNumber) {
        var smallestAngle = 5;
        var largestAngle = 80;
        var angleRange, angle;

        console.log(jQuery.extend(true, {}, subBranches));

        $.each(subBranches, function () {
            var subBranch = this;
            if (subBranch.angle < largestAngle) {
                largestAngle = subBranch.angle;
            }
        });

        angleRange = largestAngle - smallestAngle;
        angle = Math.getRandomNumber(largestAngle - (angleRange / subBranchNumber), largestAngle);
        console.log(angle);

        return angle;
    }


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
     * @param {int} subBranchNumber               Number of the sub-branch, with 1 being the outermost, and counting up
     *                                            as you move inwards
     * @param {Snowflake.SubBranch[]} subBranches Branch that this sub-branch will be added to
     */

    var SubBranch = function (subBranchNumber, subBranches) {

        this.angle = getAngle(subBranches, subBranchNumber);
        this.length = Math.getRandomNumber(1, 10);
    };

    return SubBranch;
});