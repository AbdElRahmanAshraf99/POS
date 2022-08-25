package com.example.pos.repository;

import com.example.pos.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<ProductEntity, Integer> {
    ProductEntity findByProductBarcode(String productBarcode);

    ProductEntity findByProductId(Integer productId);
}
