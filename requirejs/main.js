requirejs.config({
    paths: {
        jquery: 'jquery-1.12.3.min'
    }
});

requirejs(['jquery', 'validate'],function($, validate) {
    console.log(validate.isEqual(2,2));

});
