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

        this.canvas = document.createElement('canvas');

        this.canvas.setAttribute('width', this.width);
        this.canvas.setAttribute('height', this.height);

        this.context = this.canvas.getContext('2d');

        this.context.lineWidth = 3;
        this.context.strokeStyle = '#ffffff';
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
     * Snowflake class
     *
     * Each time you call new Snowflake, a unique set of settings is created to build the snowflake from
     *
     * @name Snowflake
     * @class Snowflake
     *
     * @property {int}               width       Width of the snowflake's canvas
     * @property {int}               height      Height of the snowflake's canvas
     * @property {object}            centre      Coordinates of the centre of the snowflake
     *                                           Defaults to the centre of the canvas
     * @property {int}               branchCount Number of branches
     * @property {Array}             branches    Array of Snowflake.Branch objects making up the snowflake
     * @property {HTMLCanvasElement} canvas      Canvas element the snowflake is drawn on
     * @property {object}            context     2d canvas context object
     * @property {HTMLElement}       domElement  DOM element that the snowflake's canvas is placed within
     *
     * @constructor
     *
     * @param {int} width         Width of the canvas
     * @param {int} height        Height of the canvas
     * @param {int} [domElement]  (optional) DOM element to attach the canvas to
     *                            If not provided, a <div> element will be created to attach the canvas to.
     *                            Either way, the element will be assigned to the domElement property of the Snowflake.
     *                            You can attach the snowflake to any part of the document with something like this,
     *                            assuming `snowflake` is a variable used to store the Snowflake object...
     *                            `document.getElementById('blizzard').appendChild(snowflake.domElement);`
     *
     * @todo Update to check the existence of the random pattern in the register to allow each one to be unique
     */
    var Snowflake = function (width, height, domElement) {

        this.height = height;
        this.width = width;

        this.centre = {
            x: this.width / 2,
            y: this.height / 2
        };

        // Prepare snowflake attributes
        this.branchCount = Math.getRandomNumber(5, 10);
        this.branches = generateBranchPatterns.call(this);

        // Prepare canvas
        prepareCanvas.call(this);

        this.draw();

        //Add to page
        this.domElement = domElement || document.createElement('domElement');
        this.domElement.appendChild(this.canvas);
    };


    /**
     * Draws the actual snowflake on the canvas
     */
    Snowflake.prototype.draw = function () {

        var c = this.context;
        var proportion = getMaxBranchSize.call(this);

        c.save();

        c.clearRect(0, 0, this.canvas.width, this.canvas.height);

        c.translate(this.centre.x, this.centre.y);

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
                    left : {
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
            }
            c.stroke();
        }

        c.restore();
    };

    return Snowflake;
});