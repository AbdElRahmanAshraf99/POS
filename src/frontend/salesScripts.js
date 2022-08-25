let orders = []
let sales = []

$.ajax({
    url: "http://localhost:8080/sales/get-all-sales",
    async: false,
    type: 'GET',
    dataType: 'JSON',
    success: function (res) {
        sales = res;
    },
    error: getError
})

$.ajax({
    url: "http://localhost:8080/orders/get-all-orders",
    async: false,
    type: 'GET',
    dataType: 'JSON',
    success: function (res) {
        orders = res;
        if (orders != null) updateUI(orders);
    },
    error: getError
})


function updateUI(orders) {
    $("#orders-accordion").html('');
    orders.forEach(function (e) {
        let orderSales = sales.filter(t => e.orderId === t.orderId);
        console.log(orderSales);
        $("#orders-accordion").append(
            '<div class="accordion-item">\n' +
            '        <h2 class="accordion-header text-light" id="panelsStayOpen-heading-' + orders.indexOf(e) + '">\n' +
            '            <button class="accordion-button fs-4" type="button" data-bs-toggle="collapse"\n' +
            '                    data-bs-target="#panelsStayOpen-collapse-' + orders.indexOf(e) + '" aria-expanded="true"\n' +
            '                    aria-controls="panelsStayOpen-collapse-' + orders.indexOf(e) + '">\n' +
            '                Order Number: ' + e.orderId + ' ,Total: ' + e.total + ' LE\n' +
            '            </button>\n' +
            '        </h2>\n' +
            '        <div id="panelsStayOpen-collapse-' + orders.indexOf(e) + '" class="accordion-collapse collapse show"\n' +
            '             aria-labelledby="panelsStayOpen-heading-' + orders.indexOf(e) + '">\n' +
            '            <div class="accordion-body">\n' +
            '<table class="table table-warning table-hover table-bordered text-center">\n' +
            '    <thead >\n' +
            '    <th>#</th>\n' +
            '    <th>Product Name</th>\n' +
            '    <th>Product Price</th>\n' +
            '    <th>Product Barcode</th>\n' +
            '    </thead>\n' +
            '    <tbody id="body-'+orders.indexOf(e)+'">\n'+
            '</tbody>\n' +
            '</table>'
            + '</div>\n' +
            '        </div>\n' +
            '    </div>');
        orderSales.forEach(function (i) {
            let product=i["product"];
            $("#body-"+orders.indexOf(e)).append('<tr>\n' +
                '<td>' + (orderSales.indexOf(i) + 1) + '</td>\n' +
                '<td>' + product["productName"] + '</td>\n' +
                '<td>' + product["productPrice"] + '</td>\n' +
                '<td>' + product["productBarcode"] + '</td>\n' +
                '    </tr>\n');
        });
    })


}

function getError(jqXHR, exception) {
    if (jqXHR.status === 0) {
        alert('Not connect.\n Verify Network.');
    } else if (jqXHR.status == 404) {
        alert('Requested page not found. [404]');
    } else if (jqXHR.status == 500) {
        alert('Sorry This Product can\'t be deleted, It has orders');
    } else if (exception === 'parsererror') {
        alert('Requested JSON parse failed.');
    } else if (exception === 'timeout') {
        alert('Time out error.');
    } else if (exception === 'abort') {
        alert('Ajax request aborted.');
    } else {
        alert('Uncaught Error.\n' + jqXHR.responseText);
    }
}
