require.config({
    paths: {
        "snowflake": "../../../src/snowflake"
    }
});

require(['snowflake'], function(Snowflake) {
    console.log(typeof Snowflake);
});