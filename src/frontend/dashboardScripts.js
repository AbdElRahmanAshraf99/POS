let barcode = document.getElementById("barcode");
let finishBtn = document.getElementById("finish");
let items = [];
let total = 0.0;

barcode.addEventListener("keydown", function (e) {
    if (e.code === "Enter" || e.keyCode === 13) {
        getProduct(e);
    }
})

function getProduct(e) {
    const barcode = e.target.value;
    $.ajax({
        url: 'http://localhost:8080/products/get-product-by-barcode?productBarcode=' + barcode,
        type: 'GET',
        dataType: 'JSON',
        success: function (res) {
            finishBtn.disabled = false;
            let result;
            if (items.filter(e => e.productId === res.productId).length > 0) {
                result = items.filter(e => e.productId === res.productId)[0];
                result.quantity += 1;
                result.total = result.quantity * res.productPrice;
            } else {
                items.push({
                    productId: res.productId,
                    productName: res.productName,
                    productPrice: res.productPrice,
                    quantity: 1,
                    total: res.productPrice
                });
            }
            updateUI();
        },
        error: function (jqXHR, exception) {
            if (jqXHR.status === 0) {
                alert('Not connect.\n Verify Network.');
            } else if (jqXHR.status == 404) {
                alert('Requested page not found. [404]');
            } else if (jqXHR.status == 500) {
                alert('Internal Server Error [500].');
            } else if (exception === 'parsererror') {
                alert('Product is not exist');
            } else if (exception === 'timeout') {
                alert('Time out error.');
            } else if (exception === 'abort') {
                alert('Ajax request aborted.');
            } else {
                alert('Uncaught Error.\n' + jqXHR.responseText);
            }
            e.target.value = '';
        }
    });
    e.target.value = '';
}

function updateUI() {
    $("#tableBody").html('');
    items.forEach(function (e) {
        $("#tableBody").append('<tr id="item-' + e.productId + '"><td>' + (items.indexOf(e) + 1) + '</td>\n' +
            '        <td>' + e.productName + '</td>\n' +
            '        <td>' + e.productPrice + '</td>\n' +
            '        <td id="item-' + e.productId + '-qty">' + e.quantity + '</td>\n' +
            '        <td id="item-' + e.productId + '-total">' + e.total + '</td>\n' +
            '        <td><button type="button" class="btn btn-danger" onclick="deleteRow(' + items.indexOf(e) + ')">Delete</button></td></tr>');
    });
    total = 0.0;
    items.map(e => total += e.total);
    $("#total").html(total);
    if (items.length <= 0) {
        finishBtn.disabled = true;
    }
}


function deleteRow(index) {
    let res;
    if (index > -1) {
        res = items.at(index);
        if (res.quantity > 1) {
            res.quantity -= 1;
            res.total -= res.productPrice;
        } else {
            items.splice(index, 1);
        }
    }
    updateUI();
    console.log(items);
}

finishBtn.addEventListener("click", function (e) {
    saveOrder();
    console.log(items);
})

function saveOrder() {
    const orderDto = items.map(e => ({
        productId: e.productId, productPrice: e.total
    }));
    $.ajax({
        url: 'http://localhost:8080/orders/saveOrder',
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(orderDto),
        dataType: 'JSON',
        success: function (res) {
            alert("Order " + res.orderId + " saved successfully");
            window.location.reload();
        }
    });
}