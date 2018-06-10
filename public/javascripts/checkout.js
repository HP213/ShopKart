
var body = document.getElementsByTagName('body')[0];
var removeLoading = function() {
    setTimeout(function() {
        body.className = body.className.replace(/loading/, '');
    }, 3000);
};
removeLoading();

var up = $('.cart_quantity_up');
var down = $('.cart_quantity_down');
var quant = $('#quant');

up.click(function () {
    var value = parseInt(quant.val()) + 1;
    console.log(value);
    quant.value = value;
    return true;
});
down.click(function () {
    var value = parseInt(quant.val()) - 1;
    quant.value = value;
    return true;
});