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
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  modalRef: BsModalRef;
  private _url: string = "/api/customer";
  private delete_url: string = "/api/customer";
  public customers = [];
  public editId: number;
  insertForm: FormGroup;
  customerName: FormControl;
  phone: FormControl;

  editinsertForm: FormGroup;
  editcustomerName: FormControl;
  editphone: FormControl;

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
    let customers = this.insertForm.value;
    this.addProduct(customers.customerName, customers.phone).subscribe(result => {
      console.log("Customer Added");
      this.modalService.hide(1);
      this.router.navigateByUrl('/customers');
    },
      error => {
        this.ErrorMessage = "Insert Failed";
        console.log(this.ErrorMessage);
        this.modalService.hide(1);
        this.router.navigateByUrl('/customers');
      });

  }

  addProduct(customerName: string, phone: string) {
    return this.http.post<any>(this._url, { customerName, phone }).pipe(
      map(result => {
        return result;
      })

    );
  }


  addEditedProduct(customerId: any, customerName: any, phone: any) {
    return this.http.put<any>(this._url + "/" + this.editId, { customerId, customerName, phone }).pipe(
      map(result => {
        return result;
      })

    );
  }

  deleteProducts(id: number) {
    this.http.delete(this.delete_url + "/" + id).subscribe();
    const itemIndex = this.customers.findIndex(obj => obj['productsId'] == id);
    this.customers.splice(itemIndex, 1);
  }

  editProducts(customerId: number, customerName: string, phone: number, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editId = customerId;
  }

  editedonSubmit() {
    let editcustomers = this.editinsertForm.value;
    this.addEditedProduct(this.editId, editcustomers.editcustomerName, editcustomers.editphone).subscribe(result => {
      console.log("Customer Edited");
      this.modalService.hide(1);
      this.router.navigateByUrl('/customers');
    },
      error => {
        this.ErrorMessage = "Edit Failed";
        console.log(this.ErrorMessage);
        this.modalService.hide(1);
        this.router.navigateByUrl('/customers');
      });
  }

  ngOnInit() {
    this.getProducts().subscribe(result => this.customers = result);
    this.insertForm = this.fb.group({
      "customerName": this.customerName,
      "phone": this.phone
    });
    this.editinsertForm = this.fb.group({
      "editcustomerName": this.editcustomerName,
      "editphone": this.editphone
    });
  }

}
