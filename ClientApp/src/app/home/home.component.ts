import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaticInjector } from '@angular/core/src/di/injector';
import { Router, ActivatedRoute } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  private _url: string = "/api/sales";
  private delete_url: string = "/api/sales";
  private product_url: string = "/api/product";
  private customer_url: string = "/api/customer";
  public products = [];
  public customers = [];
  public sales = [];
  public buffer = [];
  public final = [];
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

  

  get(url: string) {
    return this.http.get<any>(url).pipe(map(result => {
      console.log(result);
      return result;
    },
      error => {
        console.log(error);
        return error;
      }));
  }


  ngOnInit() {
    this.get(this.product_url).subscribe(result => this.products = result);
    this.get(this.customer_url).subscribe(result => this.customers = result);
    this.get(this._url).subscribe(result => this.sales = result);

    for (let data of this.sales) {
      for (let name of this.customers) {
        if (data.customerId == name.customerId) {
          this.buffer.push(name.customerName);
        }
      }
      for (let list of this.products) {
        if (data.productId == list.productId) {
          this.buffer.push(list.productName);
          this.buffer.push(list.rate);
        }
      }
      this.final.push(Object.assign({}, this.buffer));
      console.log("this is final");
      console.log(this.final);
      this.buffer = null;
    }

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
