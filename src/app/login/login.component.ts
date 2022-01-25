import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    let storageItems = this.allStorage();
    let user = storageItems.find(x => x.login == this.loginForm.value.login);

    if (user != undefined) {
      if (user.password == this.loginForm.value.password) {
        this.toastr.success('Zalogowano pomyślnie');
        sessionStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        this.toastr.error('Błędne dane logowania');
      }
    }
    else {
      this.toastr.error('Błędne dane logowania');
    }
  }

  allStorage() {
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])) );
    }

    return values;
  }
}
