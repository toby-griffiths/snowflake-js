requirejs.config({
    baseUrl: '../../src',
    shim: {},
    paths: {
        jquery: '../vendor/jquery/dist/jquery'
    },
    packages: []
});


requirejs(['Snowflake/Branch'], function (SnowflakeBranch) {
    console.log(new SnowflakeBranch(30));
});