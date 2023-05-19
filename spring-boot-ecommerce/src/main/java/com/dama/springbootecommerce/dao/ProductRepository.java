package com.dama.springbootecommerce.dao;

import com.dama.springbootecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product,Long> {
    Page<Product> findByCategoryId(@Param("id") long id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name,Pageable pageable);
}
