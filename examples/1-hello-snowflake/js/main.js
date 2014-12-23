requirejs.config({
    baseUrl: "../../src"
});

requirejs(['Snowflake/Branch'], function (SnowflakeBranch) {
    console.log(new SnowflakeBranch(30));
});