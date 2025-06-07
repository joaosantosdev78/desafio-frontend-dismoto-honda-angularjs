import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  readonly baseURL = 'http://localhost:9090/produtos/';
  list: Product[] = [];

  productForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [''],
  });

  fetchProductList() {
    this.http
      .get(this.baseURL)
      .pipe(catchError(this.errorHandler))
      .subscribe((data) => {
        this.list = data as Product[];
      });
  }

  postProduct() {
    const product = { ...this.productForm.value };
    delete product.id;
    return this.http
      .post(this.baseURL, product)
      .pipe(catchError(this.errorHandler));
  }

  putProduct() {
    const product = { ...this.productForm.value };
    delete product.id;
    return this.http
      .put(
        this.baseURL + this.productForm.get('id')?.value,
        product
      )
      .pipe(catchError(this.errorHandler));
  }

  deleteProduct(id: string) {
    return this.http
      .delete(this.baseURL + id)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("Ocorreu um erro:", error.error);
    } else {
      console.error(
        `Código retornado pelo backend ${error.status}, conteúdo: `,
        error.error
      );
    }
    return throwError(
      () => new Error("Algo errado aconteceu; tente novamente mais tarde.")
    );
  }
}
