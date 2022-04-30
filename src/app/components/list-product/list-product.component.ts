import { Component, Input, OnInit } from '@angular/core';

import { Product,createProductDTO,UpdateProdcutDTO } from '../../models/product.model';

import {StoreService} from '../../services/store.service'
import {ProductsService} from '../../services/products.service'


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  myShopingCart :Product[] = [];
  showProductDetail= false;
  productChosen:Product = {    id:"",
  title:"",
  images:[],
  price: 0,
  category: {
    id:"",
    name:""
  },
  description:"",
};

  total = 0;
  products:Product[] = [];
  today = new Date();
  date = new Date(2021,1,21)
  @Input() mostrar2:boolean = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService){
    this.myShopingCart = this.storeService.getShoppingCart()
  }


  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data =>{
    this.products = data
    })
  }

  onAddToShopingCart(product:Product){
    console.log(product)
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail
  }

  onShowDetail(id: string){
this.productsService.getProduct(id)
.subscribe(data => {
  this.toggleProductDetail()
  this.productChosen = data;
})
  }

  createNewProduct() {
    const product:createProductDTO = {
      title: 'nuevo Producto',
      description: "una descripcion nueva",
      images:[
        "https://placeimg.com/640/480/any?random=${Math.random()}"
      ],
      price:1000,
      categoryId: 2,

    }
    this.productsService.create(product)
    .subscribe(data => {
      console.log('created',data)
      this.products.unshift(data)
    })
  }

  updateProduct(){
    const changes: UpdateProdcutDTO = {
      title: "new service"

    }
    const id = this.productChosen.id
    this.productsService.update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;

    })

  }



}
