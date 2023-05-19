package com.dama.springbootecommerce.service;

import com.dama.springbootecommerce.dto.Purchase;
import com.dama.springbootecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
