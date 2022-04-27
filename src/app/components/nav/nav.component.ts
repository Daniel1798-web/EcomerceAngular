import { Component, OnInit, Input } from '@angular/core';
import {StoreService} from '../../services/store.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu = false;
  counter = 0;
  @Input() mostrar = false;
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

toggleButton(){
  this.mostrar = !this.mostrar;
};

}
