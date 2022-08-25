package com.example.pos.repository;

import com.example.pos.entity.SaleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SaleRepo extends JpaRepository<SaleEntity,Integer> {
    List<SaleEntity> findAllByOrderId(Integer orderId);
}
