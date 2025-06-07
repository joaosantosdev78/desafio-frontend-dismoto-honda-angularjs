import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/product.model';
import { ProductService } from 'src/app/shared/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent {
  submitted: boolean = false;

  constructor(public service: ProductService, private toastr: ToastrService) { }


  onSubmit() {
    this.submitted = true;
    if (this.service.productForm.valid) {
      if (this.service.productForm.get('id')?.value == '')
        this.service.postProduct().subscribe(res => {
          this.service.fetchProductList();
          this.toastr.success("Criado com sucesso", "Registro de produtos");
          this.resetForm();
        })
      else
        this.service.putProduct().subscribe(res => {
          this.service.fetchProductList();
          this.toastr.info("Atualizado com sucesso", "Registro de produtos");
          this.resetForm();
        })
    }
  }

  resetForm() {
    this.service.productForm.reset(new Product());
    this.submitted = false;
  }
}
