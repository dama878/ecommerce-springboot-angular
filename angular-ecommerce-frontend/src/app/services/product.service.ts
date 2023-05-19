import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  
  
  

  private baseUrl = `${environment.damaApiUrl}/products`;
  private categoryUrl=`${environment.damaApiUrl}/product-category`
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number): Observable<Product> {
    const productUrl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCategoryId: number): Observable<Product[]>{
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number,
                         thePageSize: number,
                         theCategoryId: number): Observable<GetResponseProducts>{

    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                    +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response =>response._embedded.productCategory)
    );
  }

  searchProducts(theKeyWord: string): Observable<Product[]> {
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`;
    return this.getProducts(searchUrl);
  }

  searchProductListPaginate(thePage: number,
                            thePageSize: number,
                            theKeyWord: string): Observable<GetResponseProducts>{

    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyWord}`
                    +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  }
}
