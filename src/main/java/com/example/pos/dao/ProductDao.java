package com.example.pos.dao;

import com.example.pos.entity.ProductEntity;
import com.example.pos.repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductDao {
    @Autowired
    private ProductRepo productRepo;

    public ProductEntity addProduct(ProductEntity productEntity) {
        return productRepo.save(productEntity);
    }

    public void deleteProduct(Integer productId) {
        productRepo.deleteById(productId);
    }

    public ProductEntity updateProduct(ProductEntity productEntity) {
        return productRepo.save(productEntity);
    }

    public ProductEntity findProductByBarcode(String productBarcode) {
        Optional<ProductEntity> product = Optional.ofNullable(productRepo.findByProductBarcode(productBarcode));
        return product.isPresent() ? product.get() : null;
    }

    public ProductEntity findProductById(Integer productId) {
        Optional<ProductEntity> product = Optional.ofNullable(productRepo.findByProductId(productId));
        return product.isPresent() ? product.get() : null;
    }

    public List<ProductEntity> findAllProduct() {
        return productRepo.findAll();
    }
}
