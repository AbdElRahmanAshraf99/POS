package com.example.pos.entity;

import com.example.pos.dao.SaleDao;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "products")
@Data
public class ProductEntity {
    @Id
    @Column(name = "product_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer productId;
    @Column(name = "poduct_name")
    private String productName;
    @Column(name = "poduct_price")
    private Double productPrice;
    @Column(name = "product_barcode")
    private String productBarcode;

    @JsonBackReference
    @OneToMany(mappedBy = "product")
    private List<SaleEntity> sales;
}
