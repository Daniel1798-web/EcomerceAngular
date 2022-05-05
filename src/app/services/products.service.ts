import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'
import {retry, catchError} from 'rxjs/operators'
import {throwError} from 'rxjs'



import {Product, createProductDTO, UpdateProdcutDTO} from '../models/product.model'

import {environment} from './../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit? : number , offset?: number) {
    let params = new HttpParams();
    if (limit && offset){
        params = params.set('limit',limit)
        params = params.set('ofsset',limit)

    }
    return this.http.get<Product[]>(this.apiUrl, {params})
    .pipe(
      retry(3)
    );

  }

  getProductsByPage(limit : number , offset: number){
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params:{limit,offset}

    });

  }


  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.Conflict){
          return throwError(()=>{"algo falla en el servidor"});

        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(()=>{ "el producto no existe"});

        }
        if(error.status === HttpStatusCode.Unauthorized){
          return  throwError(() =>{"No estas autorizado"});

        }
        return throwError(() =>{"ups algo salió mal"});
      })
    )
  }

  create(dto: createProductDTO) {
    return this.http.post<Product>(this.apiUrl, dto);  }

    update(id: string, dto : UpdateProdcutDTO) {
      return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
    }


  delete(id:string){
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);

  }

}

