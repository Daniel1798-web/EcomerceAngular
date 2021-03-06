import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Product}from '../../models/product.model'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = {
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

  clothes = false;


  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showDetail = new EventEmitter<string>();



  constructor() { }
  ngOnInit(): void {

  }

  onAddToCart(){
    this.addedProduct.emit(this.product);
  }

  onLoad(){

  }

  onShowDetail(){
    this.showDetail.emit(this.product.id)
  }


}
