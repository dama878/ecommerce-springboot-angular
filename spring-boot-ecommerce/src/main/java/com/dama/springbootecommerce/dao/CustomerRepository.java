package com.dama.springbootecommerce.dao;

import com.dama.springbootecommerce.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CustomerRepository extends JpaRepository <Customer,Long> {
    Customer findByEmail(String email);
}
