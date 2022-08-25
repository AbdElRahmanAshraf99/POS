package com.example.pos.controller;

import com.example.pos.dao.SaleDao;
import com.example.pos.entity.SaleEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/sales")
@CrossOrigin
public class SaleController {
    @Autowired
    private SaleDao saleDao;

    @GetMapping(path = "/get-all-sales")
    public List<SaleEntity> getSales() {
        return saleDao.getSales();
    }

    @GetMapping(path = "/get-sale-by-order-id")
    public List<SaleEntity> getSaleByOrderId(@RequestParam Integer orderId) {
        return saleDao.getSaleByOrderId(orderId);
    }
}
