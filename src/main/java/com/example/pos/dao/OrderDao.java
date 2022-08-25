package com.example.pos.dao;

import com.example.pos.DTO.DTOOrder;
import com.example.pos.entity.OrderEntity;
import com.example.pos.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderDao {
    @Autowired
    private OrderRepo orderRepo;

    public OrderEntity saveOrder(List<DTOOrder> dtoOrder) {
        if (dtoOrder.size() == 0)
            return null;
        Double totalPrice=dtoOrder.stream().mapToDouble(DTOOrder::getProductPrice).sum();
        OrderEntity order=new OrderEntity();
        order.setTotal(totalPrice);
        return orderRepo.save(order);
    }

    public List<OrderEntity> getAllOrders() {
        return orderRepo.findAll();
    }
}
