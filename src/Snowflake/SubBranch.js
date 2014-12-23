/**
 *
 *
 */
define(['jquery'], function ($) {

    /**
     * Generates a random angle based on the sub-branch number and the existing sub branches
     *
     * @param {int}                   subBranchNumber Which sub-branch is this
     * @param {Snowflake.SubBranch[]} subBranches     Array of existing (inner) sub-branches on the current branch
     *
     * @return {int}
     */
    function getAngle(subBranchNumber, subBranches) {
        var smallestAngle = 5;
        var largestAngle = 80;
        var angleRange, angle;

        $.each(subBranches, function () {
            var subBranch = this;
            if (subBranch.angle < largestAngle) {
                largestAngle = subBranch.angle;
            }
        });

        angleRange = largestAngle - smallestAngle;
        angle = Math.getRandomNumber(Math.floor(largestAngle - (angleRange / subBranchNumber)), largestAngle);

        return angle;
    }


    /**
     * Generates a random length for the subBranch
     *
     * @param {int}                   subBranchAngle
     * @param {int}                   branchScopedAngle
     * @param {int}                   branchLength
     * @param {int}                   subBranchNumber
     * @param {Snowflake.SubBranch[]} subBranches       Array of existing (inner) sub-branches on the current branch
     *
     * @return {int}
     */
    function getLength(subBranchAngle, branchScopedAngle, branchLength, subBranchNumber, subBranches) {

        var minLength = 5;
        var maxLength = 30;
        var availableAngle = Math.round(branchScopedAngle / 2);
        var totalSubBranches, segmentLength, distanceFromCentre, perpendicularDistanceToAngleScopeBoundary,
            angleFromPerpendicularToSubBranch, maxLengthOfSubBranch, minLengthOfSubBranch, length;

        if (availableAngle > subBranchAngle) {
            length = Math.getRandomNumber(minLength, maxLength);

            return length;
        }

        totalSubBranches = subBranchNumber + subBranches.length;
        segmentLength = Math.round(branchLength / (totalSubBranches + 1));
        distanceFromCentre = Math.round(segmentLength * (totalSubBranches - subBranchNumber + 1));

        // Work out the distance from the sub-branch root to the angular scope line, crossing the angular scope line at
        // 90 degrees
        // Math.sin() takes radians
        perpendicularDistanceToAngleScopeBoundary = Math.floor(distanceFromCentre * Math.sin(availableAngle * (Math.PI / 180)));
        angleFromPerpendicularToSubBranch = 180 - subBranchAngle - (180 - 90 - (branchScopedAngle / 2));
        // Math.tan() takes radians
        maxLengthOfSubBranch = Math.floor(perpendicularDistanceToAngleScopeBoundary
        * Math.tan(angleFromPerpendicularToSubBranch * (Math.PI / 180)));
        minLengthOfSubBranch = Math.min(minLength, Math.floor(maxLengthOfSubBranch / 3));
        length = Math.getRandomNumber(minLengthOfSubBranch, Math.max(maxLengthOfSubBranch, maxLength));

        return length;
    }


    /**
     * Class used to define the sub-branch of a snowflake branch
     *
     * Creates a new snowflake branch's SubBranch, using details of which sub-branch number it is, and the number of sub
     * branches there will be to create the angle and length
     *
     * @name Snowflake.SubBranch
     * @class Snowflake.SubBranch
     *
     * @property {int} subBranchNumber
     * @property {int} angle
     * @property {int} length
     *
     * @constructor
     *
     * @param {int}                   subBranchNumber Number of the sub-branch, with 1 being the outermost, and counting
     *                                                up as you move inwards
     * @param {Snowflake.SubBranch[]} subBranches     Array of existing (inner) sub-branches on the current branch
     * @param {int} scopeAngle                        Degrees we've got to fit the branch within
     * @param {int} branchLength                      Total length of the branch
     */
    var SubBranch = function (subBranchNumber, subBranches, scopeAngle, branchLength) {

        this.subBranchNumber = subBranchNumber;
        this.angle = getAngle(subBranchNumber, subBranches);
        this.length = getLength(this.angle, scopeAngle, branchLength, this.subBranchNumber, subBranches);
    };

    return SubBranch;
});