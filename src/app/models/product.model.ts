export interface Product
 {
   id:number;
   title:string;
   price:number;
   images:string[];
   description:string;
   category:Category;
 }


 export interface Category
 {
   id:string;
   name:string;
 }
