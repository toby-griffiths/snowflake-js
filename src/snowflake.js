define(['Math', 'Snowflake/Branch'], function (Math, Branch) {

    window.SnowflakeJS = window.SnowflakeJS || {
        uniqueSnowflakes: []
    };

    /**
     * Generates the pattern for each branch
     * Uses the number of branchCount to calculate the angleInRadians between branchCount, and therefore the space available for the
     * branch
     * @param {int} branchCount
     * @return {Array} Returns an array of pattern parameters
     */
    function generateBranchPatterns(branchCount) {

        var angleInRadians = 2 * Math.PI / branchCount;
        var patternCount = generatePatternCount(branchCount);
        var branchPatterns = [];
        var branches = [];

        do {
            branchPatterns.push(new Branch(angleInRadians));
        } while (branchPatterns.length < patternCount);

        do {
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

        var possiblePatternCounts = Math.getCommonDenominators(branches);

        return possiblePatternCounts[Math.getRandomNumber(1, possiblePatternCounts.length) - 1];
    }


    /**
     * Prepares the canvase ready for the snowflake ot be drawn on
     * @return {HTMLElement}
     */
    function prepareCanvas() {

        var canvas = document.createElement('canvas');

        canvas.setAttribute('width', this.width);
        canvas.setAttribute('height', this.height);

        this.context = canvas.getContext('2d');
        this.context.translate(this.width / 2, this.height / 2);

        return canvas;
    }


    /**
     * Calculates the longest branch in the snowflake
     * @return {int}
     */
    function getMaxBranchSize() {

        var maxBranchSize = 0;

        for (var branchNumber in this.branches) {
            if (!this.branches.hasOwnProperty(branchNumber)) {
                continue;
            }

            var branch = this.branches[branchNumber];

            if (branch.length > maxBranchSize) {
                maxBranchSize = branch.length;
            }
        }

        return (maxBranchSize / Math.min(this.width, this.height)) / 2;
    }

    /**
     * Draws the actual snowflake on the canvas
     */
    function drawSnowflake() {

        var c = this.context;
        var proportion = getMaxBranchSize.call(this);

        console.log('proportion:', proportion);

        for (var branchI in this.branches) {
            if (!this.branches.hasOwnProperty(branchI)) {
                continue;
            }

            var branch = this.branches[branchI];
            var branchAngle = (2 * Math.PI) / this.branches.length * branchI;
            var proportionalLength = branch.length * proportion;

            /**
             * Remove this once all's working OK
             */
            (function () {
                var arcEnd = {
                    x: Math.sin((branchAngle + branch.scopeAngle) / 2) * proportionalLength,
                    y: -Math.cos((branchAngle + branch.scopeAngle) / 2) * proportionalLength
                };
                c.save();
                c.strokeStyle = '#ff0000';
                c.beginPath();
                c.moveTo(arcEnd.x, arcEnd.y);
                c.lineTo(0, 0);
                c.lineTo(-arcEnd.x, arcEnd.y);
                c.stroke();
                c.restore();
            }());

            var branchEndCoords = {
                x: Math.round(Math.sin(branchAngle) * proportionalLength),
                y: Math.round(-Math.cos(branchAngle) * proportionalLength)
            };

            console.log('proportionalLength:', proportionalLength, 'branchAngle:', branchAngle, 'branchEndCoords:', branchEndCoords);

            c.beginPath();
            c.moveTo(0, 0);
            c.lineTo(branchEndCoords.x, branchEndCoords.y);
            c.stroke();

            console.log('sub-branch count:', branch.subBranches.length);

            for (subBranchI in branch.subBranches) {
                if (!branch.subBranches.hasOwnProperty(subBranchI)) {
                    continue;
                }

                var subBranch = branch.subBranches[subBranchI];
                var distanceFromCentre = (proportionalLength / (branch.subBranches.length + 1)) * subBranch.subBranchNumber;
                var subBranchStartCoords = {
                    x: Math.sin(branchAngle) * distanceFromCentre,
                    y: -Math.cos(branchAngle) * distanceFromCentre
                };
                var proportionalSubBranchLength = subBranch.length * proportion;
                var subBranchEndCoords = {
                    x: subBranchStartCoords.x + Math.sin(branchAngle - subBranch.angle) * proportionalSubBranchLength,
                    y: subBranchStartCoords.y - Math.cos(branchAngle - subBranch.angle) * proportionalSubBranchLength
                };

                console.log('Sub-branch coords:', subBranchStartCoords, subBranchEndCoords);

                //c.moveTo(subBranchStartCoords.x, subBranchStartCoords.y);
                //c.arc(subBranchStartCoords.x, subBranchStartCoords.y, 3, 0, 180);
                //c.fill();
                //continue;
                //
                //console.log(subBranchStartCoords, subBranchEndCoords);

                console.log(subBranch);

                c.moveTo(subBranchStartCoords.x, subBranchStartCoords.y);
                c.lineTo(subBranchEndCoords.x, subBranchEndCoords.y)

            }
            c.stroke();

            return;
        }

    }

    /**
     * Snowflake class
     *
     * Each time you call new Snowflake, a unique set of settings is created to build the snowflake from
     *
     * @name Snowflake
     * @class Snowflake
     * @constructor
     *
     * @todo Update to check the existence of the random pattern in the register to allow each one to be unique
     */
    var Snowflake = function (width, height, div) {

        this.height = height;
        this.width = width;

        // Prepare snowflake attributes
        this.branchCount = Math.getRandomNumber(5, 10);
        this.branches = generateBranchPatterns(this.branchCount);

        // Prepare canvas
        var canvas = prepareCanvas.call(this);

        console.log(this);
        console.log(this.branches[0]);

        drawSnowflake.call(this);

        //Add to page
        this.domElement = div || document.createElement('div');
        this.domElement.appendChild(canvas);
    };

    return Snowflake;
});