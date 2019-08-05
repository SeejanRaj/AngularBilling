import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { StaticInjector } from '@angular/core/src/di/injector';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  insertForm: FormGroup;
  Email: FormControl;
  Password: FormControl;
  returnUrl: string;
  ErrorMessage: string;
  invalidLogin: boolean;

  constructor(private acct: AccountService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }

  onSubmit() {
    let userlogin = this.insertForm.value;
    this.acct.login(userlogin.Email, userlogin.Password).subscribe(result => {
      let token = (<any>result).token;
      console.log(token);
      console.log(result.userRole);
      console.log("Logged in");
      this.invalidLogin = false;
      console.log(this.returnUrl);
       this.router.navigateByUrl('products');

    },
      error => {
        this.ErrorMessage = "Couldnt login";
        console.log(this.ErrorMessage);
        this.router.navigateByUrl('login');


      });

  }

  ngOnInit() {
    this.Email = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.insertForm = this.fb.group({
      "Email": this.Email,
      "Password": this.Password
    });


  }
}
