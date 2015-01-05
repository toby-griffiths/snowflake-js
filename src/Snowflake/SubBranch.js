/**
 *
 *
 */
define(['jquery'], function ($) {

    /**
     * Generates a random angleInRadians based on the sub-branch number and the existing sub branches
     *
     * @return {int}
     */
    function getAngle() {
        var smallestAngle = 45 * Math.PI / 180;
        var largestAngle = 80 * Math.PI / 180;
        var angleRange, angleInRadians;

        $.each(this.parentBranch.subBranches, function () {
            var subBranch = this;
            if (subBranch.angle < largestAngle) {
                largestAngle = subBranch.angle;
            }
        });

        angleRange = largestAngle - smallestAngle;
        angleInRadians = (Math.random() * angleRange) + smallestAngle;

        return angleInRadians;
    }


    /**
     * Generates a random length for the subBranch
     *
     * @var {Snowflake.SubBranch} this
     *
     * @return {int}
     */
    function getLength() {

        var minLength = 20;
        var maxLength = 30;
        var branchAngle = this.parentBranch.scopeAngle;
        var availableAngle = Math.round(branchAngle / 2);
        var totalSubBranches, segmentLength, distanceFromCentre, perpendicularDistanceToAngleScopeBoundary,
            angleFromPerpendicularToSubBranch, maxLengthOfSubBranch, minLengthOfSubBranch, length;

        if (availableAngle > this.angle) {
            length = Math.getRandomNumber(minLength, maxLength);

            return length;
        }

        totalSubBranches = this.subBranchNumber + this.parentBranch.subBranches.length;
        segmentLength = Math.round(this.parentBranch.length / (totalSubBranches + 1));
        distanceFromCentre = Math.round(segmentLength * (totalSubBranches - this.subBranchNumber + 1));

        // Work out the distance from the sub-branch root to the angular scope line, crossing the angular scope line at
        // 90 degrees
        // Math.sin() takes radians
        perpendicularDistanceToAngleScopeBoundary = Math.floor(distanceFromCentre * Math.sin(availableAngle * (Math.PI / 180)));
        angleFromPerpendicularToSubBranch = 180 - this.angle - (180 - 90 - (branchAngle / 2));
        // Math.tan() takes radians
        maxLengthOfSubBranch = Math.floor(perpendicularDistanceToAngleScopeBoundary
        * Math.tan(angleFromPerpendicularToSubBranch * (Math.PI / 180)));
        minLengthOfSubBranch = Math.min(minLength, Math.floor(maxLengthOfSubBranch / 3));
        length = Math.getRandomNumber(minLengthOfSubBranch, Math.min(maxLengthOfSubBranch, maxLength));

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
     * @property {Snowflake.Branch} parentBranch    Branch object that this belongs to
     * @property {int}              subBranchNumber Branch number of this branch
     * @property {int}              angle           Angle of the sub-branch
     * @property {int}              length          Lenth of the sub-branch
     *
     * @constructor
     *
     * @param {Snowflake.Branch}      parentBranch    Branch that this sub-branch belongs to
     * @param {int}                   subBranchNumber Number of the sub-branch, with 1 being the outermost, and counting
     *                                                up as you move inwards
     */
    var SubBranch = function (parentBranch, subBranchNumber) {

        this.parentBranch = parentBranch;
        this.subBranchNumber = subBranchNumber;
        this.angle = getAngle.call(this);
        this.length = getLength.call(this);
    };

    return SubBranch;
});