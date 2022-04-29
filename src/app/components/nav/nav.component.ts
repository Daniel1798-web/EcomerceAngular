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
  this.mostrar.emit(this.valor)
}

}
