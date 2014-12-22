require.config({
    paths: {
        "snowflake": "../../../src/snowflake",
        "math": "../../../src/math"
    }
});

require(['snowflake'], function(Snowflake) {
    console.log(typeof Snowflake);
});