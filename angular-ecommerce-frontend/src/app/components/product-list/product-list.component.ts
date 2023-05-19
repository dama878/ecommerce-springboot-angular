import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
}) 
export class ProductListComponent implements OnInit{

  products!: Product[];
  currentCategoryId!: number;
  previousCategoryId!: number;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousKeyWord: string = "";

  constructor(private productService:ProductService,private cartService: CartService, private route:ActivatedRoute ){
   

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
      
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchProducts();
    }
    else {

      this.handleListProduct();
    }

  }
  handleSearchProducts() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyWord != theKeyWord) {
      this.thePageNumber = 1;
    }
    this.previousKeyWord = theKeyWord;
    console.log(`keyWord=${theKeyWord}, thePageNumber=${this.thePageNumber}`);

    this.productService.searchProductListPaginate(this.thePageNumber - 1,
                                                  this.thePageSize,
                                                  theKeyWord).subscribe(this.processResult());
     
    
  }

  handleListProduct(){
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId){
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id')!;
    } 
    else {
      this.currentCategoryId=1
    }

    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId=this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber:${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber -1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(
                                                this.processResult()
                                               );
  }
  
  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements=data.page.totalElements;
    }
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem= new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);  
  }
}
