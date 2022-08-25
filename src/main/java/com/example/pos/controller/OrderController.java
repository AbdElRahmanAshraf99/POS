package com.example.pos.controller;

import com.example.pos.DTO.DTOOrder;
import com.example.pos.dao.OrderDao;
import com.example.pos.dao.SaleDao;
import com.example.pos.entity.OrderEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/orders")
@CrossOrigin
public class OrderController {
    @Autowired
    private OrderDao orderDao;

    @Autowired
    private SaleDao saleDao;

    @PostMapping(path = "/saveOrder")
    public OrderEntity saveOrder(@RequestBody List<DTOOrder> dtoOrders) {
        return saleDao.saveSale(dtoOrders);
    }

    @GetMapping(path = "/get-all-orders")
    public List<OrderEntity> getAllOrders() {
        return orderDao.getAllOrders();
    }
}
