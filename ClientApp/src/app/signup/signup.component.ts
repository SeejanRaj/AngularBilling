import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { retry } from 'rxjs/operators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private acct: AccountService, private router: Router, private route: ActivatedRoute) {

  }
  insertForm: FormGroup;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  cpassword: FormControl;
 
  invalidRegister: boolean;


  
  onSubmit() {
    let userDetails = this.insertForm.value;
    this.acct.register(userDetails.username, userDetails.password, userDetails.email).subscribe(result => {

      this.router.navigate(['/login']);
    },
      error => {

        this.router.navigate(['/login']);
        console.log(error);
      });

  }

  //Custom pass validator
  MustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      if (!cpasswordControl && !passwordControl) {
        return null;
      }
      if (cpasswordControl.hasError && passwordControl.hasError) {
        return null;
      }
      if (passwordControl.value !== cpasswordControl.value) {
        return { 'mustMatch': true };
      }
      else {
        return null;
      }
    }
  }
  ngOnInit() {
    this.username = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.cpassword = new FormControl('', [Validators.required, this.MustMatch(this.password)]);
  

    this.insertForm = this.fb.group(
      {
        'username': this.username,
        'password': this.password,
        'cpassword': this.cpassword,
        'email': this.email,
      

      });
  }

}
