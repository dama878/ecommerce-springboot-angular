package com.dama.springbootecommerce.dto;

import com.dama.springbootecommerce.entity.Address;
import com.dama.springbootecommerce.entity.Customer;
import com.dama.springbootecommerce.entity.Order;
import com.dama.springbootecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;
@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;

    private  Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
