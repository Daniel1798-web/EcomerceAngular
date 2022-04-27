import { Component, Input} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imageParent = "";
  showImg= true;
 cosa=false;




  onLoaded(img:string){
    console.log("loaded padre", img)
  }

  toggleImg(){
    this.showImg = !this.showImg
  }
}
