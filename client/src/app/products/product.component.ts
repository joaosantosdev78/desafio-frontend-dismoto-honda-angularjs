import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  constructor(public service: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.service.fetchProductList();
  }

  populateForm(selectedRecord: Product) {
    this.service.productForm.setValue({
      id: selectedRecord.id,
      name: selectedRecord.name,
      description: selectedRecord.description,
      price: selectedRecord.price,
    });
  }

  onDelete(id: string) {
    if (confirm("Tem certeza de que deseja excluir esse registro?")) {
      this.service.deleteProduct(id).subscribe((res) => {
        this.service.fetchProductList();
        this.toastr.error("Excluído com êxito", "Registro de produtos");
      });
    }
  }
}
