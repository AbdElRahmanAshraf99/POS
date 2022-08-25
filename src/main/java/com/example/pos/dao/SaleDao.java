package com.example.pos.dao;

import com.example.pos.DTO.DTOOrder;
import com.example.pos.entity.OrderEntity;
import com.example.pos.entity.SaleEntity;
import com.example.pos.repository.SaleRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleDao {
    @Autowired
    private SaleRepo saleRepo;

    private OrderDao orderDao;

    public SaleDao(OrderDao orderDao) {
        this.orderDao = orderDao;
    }

    public OrderEntity saveSale(List<DTOOrder> dtoOrder) {
        OrderEntity order=orderDao.saveOrder(dtoOrder);
        for (DTOOrder o : dtoOrder) {
            SaleEntity saleEntity=new SaleEntity();
            saleEntity.setOrderId(order.getOrderId());
            saleEntity.setProductId(o.getProductId());
            saleRepo.save(saleEntity);
        }
        return order;
    }

    public List<SaleEntity> getSales(){
        return saleRepo.findAll();
    }

    public List<SaleEntity> getSaleByOrderId(Integer orderId) {
        return saleRepo.findAllByOrderId(orderId);
    }
}
