define(['Math', 'Snowflake/Branch'], function (Math, Branch) {

    window.SnowflakeJS = window.SnowflakeJS || {
        uniqueSnowflakes: []
    };

    /**
     * Generates the pattern for each branch
     *
     * Uses the number of branchCount to calculate the angleInRadians between branchCount, and therefore the space available for the
     * branch
     *
     * @return {Array} Returns an array of pattern parameters
     */
    function generateBranchPatterns() {

        var angleInRadians = 2 * Math.PI / this.branchCount;
        var patternCount = generatePatternCount(this.branchCount);
        var branchPatterns = [];
        var branches = [];

        do {
            branchPatterns.push(new Branch(angleInRadians));
        } while (branchPatterns.length < patternCount);

        do {
            branches.push(branchPatterns[branches.length % branchPatterns.length]);
        } while (branches.length < this.branchCount);

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

            for (var subBranchI in branch.subBranches) {
                if (!branch.subBranches.hasOwnProperty(subBranchI)) {
                    continue;
                }

                var subBranch = branch.subBranches[subBranchI];
                var distanceFromCentre = proportionalLength
                    - ((proportionalLength / (branch.subBranches.length + 1)) * subBranch.subBranchNumber);
                var subBranchStartCoords = {
                    x: Math.sin(branchAngle) * distanceFromCentre,
                    y: -Math.cos(branchAngle) * distanceFromCentre
                };
                var proportionalSubBranchLength = subBranch.length * proportion;
                var subBranchEndCoords = {
                    left: {
                        x: subBranchStartCoords.x + Math.sin(branchAngle - subBranch.angle) * proportionalSubBranchLength,
                        y: subBranchStartCoords.y - Math.cos(branchAngle - subBranch.angle) * proportionalSubBranchLength
                    },
                    right: {
                        x: subBranchStartCoords.x + Math.sin(branchAngle + subBranch.angle) * proportionalSubBranchLength,
                        y: subBranchStartCoords.y - Math.cos(branchAngle + subBranch.angle) * proportionalSubBranchLength
                    }

                };

                console.log('Sub-branch coords:', subBranchStartCoords, subBranchEndCoords);

                c.moveTo(subBranchStartCoords.x, subBranchStartCoords.y);
                c.lineTo(subBranchEndCoords.left.x, subBranchEndCoords.left.y);
                c.moveTo(subBranchStartCoords.x, subBranchStartCoords.y);
                c.lineTo(subBranchEndCoords.right.x, subBranchEndCoords.right.y);

                //c.fillText(
                //    subBranch.subBranchNumber + ':' + subBranch.angle,
                //    subBranchStartCoords.x + 10,
                //    subBranchStartCoords.y
                //);
            }
            c.stroke();
        }

    }

    /**
     * Snowflake class
     *
     * Each time you call new Snowflake, a unique set of settings is created to build the snowflake from
     *
     * @name Snowflake
     * @class Snowflake
     *
     * @property {int}               width       Width of the snowflake's canvas
     * @property {int}               height      Height of the snowflake's canvas
     * @property {int}               branchCount Number of branches
     * @property {Array}             branches    Array of Snowflake.Branch objects making up the snowflake
     * @property {HTMLCanvasElement} canvas      Canvas element the snowflake is drawn on
     * @property {HTMLElement}       domElement  DOM element that the snowflake's canvas is placed within
     *
     * @constructor
     *
     * @todo Update to check the existence of the random pattern in the register to allow each one to be unique
     */
    var Snowflake = function (width, height, div) {

        this.height = height;
        this.width = width;

        // Prepare snowflake attributes
        this.branchCount = Math.getRandomNumber(5, 10);
        this.branches = generateBranchPatterns.call(this);

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