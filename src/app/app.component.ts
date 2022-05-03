import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imageParent = "";
  showImg= true;
  leche = "leche"
  items = ["leche","agua"]
  valorAll: boolean =false;
  valorClothes: boolean =false;



  onLoaded(img:string){
    console.log("loaded padre", img)
  }

  toggleImg(){
    this.showImg = !this.showImg
  }

  addItem(newItem : string){
this.items.push(newItem)
  }

  algo(valor : boolean){
    this.valorAll = valor
  }

  showList2(valor2 : boolean){
    this.valorClothes = valor2
  }


}
