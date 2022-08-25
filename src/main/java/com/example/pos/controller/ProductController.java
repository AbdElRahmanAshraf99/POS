package com.example.pos.controller;

import com.example.pos.dao.ProductDao;
import com.example.pos.entity.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "")
@CrossOrigin
public class ProductController {
    @Autowired
    private ProductDao productDao;

    @PostMapping("/add-product")
    public ProductEntity addProduct(@RequestBody ProductEntity productEntity) {
        return productDao.addProduct(productEntity);
    }

    @PostMapping("/update-product")
    public ProductEntity updateProduct(@RequestBody ProductEntity productEntity) {
        return productDao.updateProduct(productEntity);
    }

    @PostMapping("/delete-product")
    public void deleteProduct(@RequestParam Integer productId) {
        productDao.deleteProduct(productId);
    }

    @GetMapping("/get-product-by-barcode")
    public ProductEntity getProductByBarcode(@RequestParam String productBarcode) {
        return productDao.findProductByBarcode(productBarcode);
    }

    @GetMapping("/get-product-by-id")
    public ProductEntity getProductById(@RequestParam Integer productId) {
        return productDao.findProductById(productId);
    }

    @GetMapping("/get-all-products")
    public List<ProductEntity> getAllProduct() {
        return productDao.findAllProduct();
    }
}
