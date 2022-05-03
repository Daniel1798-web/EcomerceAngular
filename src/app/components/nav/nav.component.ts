import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {StoreService} from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  valor = false;
  valor2 = false;

  @Output() show2  = new EventEmitter<boolean>();


  @Output() mostrar  = new EventEmitter<boolean>();

    constructor(
    private storeService: StoreService
  ) { }



  ngOnInit(): void {
    this.storeService.myCart$.subscribe(products =>{
      this.counter = products.length
    })


  }

toggleMenu(){
  this.activeMenu = !this.activeMenu
}

toggleButton(value : boolean){
  this.mostrar.emit(value)
};

clicado(){
  this.valor = !this.valor
  this.valor2 = false;
  this.mostrar.emit(this.valor)
  this.show2.emit(this.valor2)
}

activeClothes(){
  this.valor2 = !this.valor2
  this.valor = false;
  this.show2.emit(this.valor2)
  this.mostrar.emit(this.valor)
}

}
