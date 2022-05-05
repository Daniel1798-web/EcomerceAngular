import { Component, Input, OnInit } from '@angular/core';

import { Product,createProductDTO,UpdateProdcutDTO } from '../../models/product.model';

import {StoreService} from '../../services/store.service'
import {ProductsService} from '../../services/products.service'

import Swal from 'sweetalert2'


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  myShopingCart :Product[] = [];
  showProductDetail= false;
  productChosen:Product = {
  id:"",
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
  @Input() showClothes:boolean = false;

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService){
    this.myShopingCart = this.storeService.getShoppingCart()
  }

  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init'


  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0)
    .subscribe(data =>{
    this.products = data;
    this.loadMore

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

  onShowDetail(id: string ){
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      this.statusDetail = 'success'
      console.log(this.statusDetail)

}, ()=> {
  this.statusDetail = 'error'
  console.log(this.statusDetail)
  Swal.fire({
    title: "bom",
    text: "No se encontró el producto",
    icon: 'error',
    confirmButtonText: 'cool'

  })

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

  deleteProduct(){
    const id = this.productChosen.id
    this.productsService.delete(id).subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
      alert("borrado correctamente");
    })
  }

  loadMore(){
    this.productsService.getProductsByPage(this.limit , this.offset)
    .subscribe(data =>{
    this.products = this.products.concat(data)
    this.offset += this.limit;
    })
  }



}
