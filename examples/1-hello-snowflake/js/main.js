requirejs.config({
    baseUrl: '../../src',
    shim: {},
    paths: {
        jquery: '../vendor/jquery/dist/jquery'
    },
    packages: []
});


requirejs(['Snowflake'],
    /**
     * Prepares and adds a snowflake to the page
     * @param {Snowflake} Snowflake
     */
    function (Snowflake) {

        var snowflake;

        for (var i = 0; i < 30; i++) {
            snowflake = new Snowflake(300, 150, document.getElementById('blizzard'));

            snowflake.centre = {
                x: 75,
                y: 75
            };
            snowflake.draw();
        }
    }
);