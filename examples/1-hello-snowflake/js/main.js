require.config({
    baseUrl: "../../src"
});

requirejs(['Snowflake/Branch'], function (SnowflakeBranch) {
    for (var i=0; i < 20; i++) {
        console.log(new SnowflakeBranch(30));
    }
});

//requirejs(['Snowflake'], function(Snowflake) {
//    console.log(new Snowflake());
//});