let products = []
$.ajax({
    url: "http://localhost:8080/products/get-all-products", type: 'GET', dataType: 'JSON', success: function (res) {
        products = res;
        if (products != null) updateUI(products);
    }
})

function updateUI(products) {
    $("#tableBody").html('');
    products.forEach(function (e) {
        $("#tableBody").append('<tr id="product-' + e.productId + '">' + '<td>' + (products.indexOf(e) + 1) + '</td>\n' + '<td>' + e.productName + '</td>\n' + '<td>' + e.productPrice + '</td>\n' + '<td>' + e.productBarcode + '</td>\n' + '<td class="d-flex justify-content-evenly">' + '<button type="button" class="btn btn-warning px-4" data-bs-toggle="modal"\n' +
            '            data-bs-target="#editProductModal" data-bs-id="' + e.productId + '">Edit</button>' + '<button type="button" class="btn btn-danger px-4" data-bs-toggle="modal" data-bs-target="#deleteProductModal" data-bs-id="' + e.productId + '">Delete</button></td>' + '</tr>');
    });
}

var deleteProductModal = document.getElementById('deleteProductModal')
deleteProductModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget
    let productId = button.getAttribute('data-bs-id');
    $("#btnDeleteProduct").attr("data-bs-id", productId);
})

var editProductModal = document.getElementById('editProductModal')
editProductModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let productId = button.getAttribute('data-bs-id');
    console.log(products)
    console.log(productId)
    let product = products.filter(l => l.productId == productId).at(0);
    console.log(product.productName)
    $("#edit-product-name").val(product.productName);
    $("#edit-product-price").val(product.productPrice);
    $("#edit-product-barcode").val(product.productBarcode);


    $("#btn-edit").on("click", function () {
        let productName = $("#edit-product-name").val();
        let productPrice = $("#edit-product-price").val();
        let productBarcode = $("#edit-product-barcode").val();
        if (productName && productPrice && productBarcode) {
            if (!isBarcodeExist(productBarcode, productId)) {
                editProduct(productId, productName, productPrice, productBarcode);
            }
        } else {
            //TODO::TOAST
            console.log("All Fields Should Have A Value");
        }
    })
})

$("#btnDeleteProduct").on('click', function () {
    let productId = $("#btnDeleteProduct").attr("data-bs-id");
    console.log(productId);
    deleteProduct(productId);
});

function editProduct(productId, productName, productPrice, productBarcode) {
    const productDTO = {
        productId: productId, productName: productName, productPrice: productPrice, productBarcode: productBarcode
    };
    $.ajax({
        url: "http://localhost:8080/products/update-product",
        type: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(productDTO),
        dataType: 'JSON',
        success: function (res) {
            alert("Product " + res.productId + " updated successfully");
            window.location.reload();
        },
        error: getError
    });
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

function deleteProduct(id) {
    $.ajax({
        url: "http://localhost:8080/products/delete-product?productId=" + id, type: 'POST', success: function (res) {
            window.location.reload();
        }, error: getError
    })
}

function addProduct(productName, productPrice, productBarcode) {
    const productDTO = {
        productName: productName, productPrice: productPrice, productBarcode: productBarcode
    };
    $.ajax({
        url: 'http://localhost:8080/products/add-product', type: 'POST', headers: {
            'Content-Type': 'application/json'
        }, data: JSON.stringify(productDTO), dataType: 'JSON', success: function (res) {
            alert("Product " + res.productId + " added successfully");
            window.location.reload();
        }
    });
}

function isBarcodeExist(productBarcode, productId) {
    let exist = false;
    if (products.filter(l => l.productBarcode == productBarcode && l.productId != productId).length !== 0) {
        //TODO::TOAST
        console.log("Barcode is already Exist");
        exist = true;
    }
    return exist;
}

$("#btn-save").on("click", function () {
    let productName = $("#product-name").val();
    let productPrice = $("#product-price").val();
    let productBarcode = $("#product-barcode").val();
    if (productName && productPrice && productBarcode) {
        if (!isBarcodeExist(productBarcode, -1)) {
            addProduct(productName, productPrice, productBarcode);
        }
    } else {
        //TODO::TOAST
        console.log("All Fields Should Have A Value");
    }
})