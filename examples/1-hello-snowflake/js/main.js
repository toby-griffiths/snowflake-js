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
     * @param Snowflake
     */
    function (Snowflake) {
        new Snowflake(150, 150, document.getElementById('blizzard'));
    }
);