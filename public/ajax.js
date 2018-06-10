var button = $('#showmore');
var table = $('#tableloader');
var circle = $('#downloader');
var data = 3;
button.click(function () {
    button.css('display','none');
    circle.css('display','');
    data += 3;
    console.log("previous"+data);
    $.ajax({
        url:"/",
        type:'GET',
        contentType: "application/json",
        data:{'data':data},
        success: function (response) {
            button.css('display','');
            circle.css('display','none');
            if (response.products.length < 1){
                button.text("No More Results To Show");
            }
            if (response.products.length <3){
                data -= 3;
                data += response.products.length;
            }
            console.log(response.products);
            for (var product of response.products){
                var decision = '';
                if(product.available === true){
                decision = "<a href=\"/add-to-cart/"+product._id+"\" class=\"add-to-cart btn btn-default add-to-cart\"><i class=\"fa fa-shopping-cart\"></i>Add to cart</a>"
                } else {
                decision = "<a class=\"btn btn-default add-to-cart\">Out Of Stock</a>";
                }
                table.append("<div id=\"tableloader\" class=\"col-sm-4\">\n" +
                    "<div class=\"product-image-wrapper\">\n" +
                    "<div class=\"single-products\">\n" +
                    "<div class=\"productinfo text-center\">\n" +
                    "<div class=\"thumbnail\">\n" +
                    "<img src=\""+product.image+"\" alt=\"\" />\n" +
                    "</div>\n" +
                    "<h2>Rs "+product.discountedPrice+"</h2>\n" +
                    "<p>"+product.title+"</p>\n" +decision+
                    "<a href=\"/more-info/"+product._id+"\" class=\"btn btn-default add-to-cart\">Product Page</a>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>\n" +
                    "</div>");
            }
        }
    })
});