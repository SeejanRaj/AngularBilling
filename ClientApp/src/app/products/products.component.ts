import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaticInjector } from '@angular/core/src/di/injector';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  modalRef: BsModalRef;
  private _url: string = "/api/product";
  private delete_url: string = "/api/product";
  public products = [];
  public editId: number;
  insertForm: FormGroup;
  productName: FormControl;
  rate: FormControl;

  editinsertForm: FormGroup;
  editproductName: FormControl;
  editrate: FormControl;

  ErrorMessage: string;

  constructor(
      private http: HttpClient,
      private router: Router,
      private modalService: BsModalService,
      private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getProducts() {
    return this.http.get<any>(this._url).pipe(map(result => {
      console.log(result);
      return result;
    },
      error => {
        console.log(error);
        return error;
      }));
  }

  onSubmit() {
    let products = this.insertForm.value;
    this.addProduct(products.productName, products.rate).subscribe(result => {
      console.log("Product Added");
     this.modalService.hide(1);
      this.router.navigateByUrl('/products');
    },
      error => {
        this.ErrorMessage = "Insert Failed";
        console.log(this.ErrorMessage);
        this.modalService.hide(1);
        this.router.navigateByUrl('/products');
      });

    }

  addProduct(productName:string, rate:string) {
    return this.http.post<any>(this._url, { productName, rate }).pipe(
      map(result => {
        return result;
      })

    );
  }
   

  addEditedProduct(productId: any, productName: any, rate: any) {
    return this.http.put<any>(this._url + "/" + this.editId, { productId, productName, rate }).pipe(
      map(result => {
        return result;
      })

    );
  }

  deleteProducts(id: number) {
    this.http.delete(this.delete_url + "/" + id).subscribe();
    const itemIndex = this.products.findIndex(obj => obj['productsId'] == id);
    this.products.splice(itemIndex, 1);
  }

  editProducts(productId: number, productName: string, rate: number, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editId = productId;
  }

  editedonSubmit() {
    let editproducts = this.editinsertForm.value;
    this.addEditedProduct(this.editId ,editproducts.editproductName, editproducts.editrate).subscribe(result => {
      console.log("Product Edited");
      this.modalService.hide(1);
     this.router.navigateByUrl('/products');
    },
      error => {
        this.ErrorMessage = "Edit Failed";
        console.log(this.ErrorMessage);
        this.modalService.hide(1);
        this.router.navigateByUrl('/products');
      });
  }

  ngOnInit() {
    this.getProducts().subscribe(result => this.products = result);
    this.insertForm = this.fb.group({
      "productName": this.productName,
      "rate": this.rate
    });
    this.editinsertForm = this.fb.group({
      "editproductName": this.editproductName,
      "editrate": this.editrate
    });
  }

}
