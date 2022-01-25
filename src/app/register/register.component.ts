import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CinemaService } from '../_services/cinema.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  validationErrors: string[] = [];
  loggedInUser = false;
  
  constructor(private fb: FormBuilder, private router: Router,
              private toastr: ToastrService, public cinemaService: CinemaService) { 
                if (sessionStorage.getItem('user')) {
                  this.loggedInUser = true;
                } else {
                  this.loggedInUser = false;
                }
              }

  ngOnInit(): void {
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerForm = this.fb.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,
        Validators.minLength(5), Validators.maxLength(8), this.strengthValidator]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password')!.value ===
           g.get('confirmPassword')!.value ? null : {'mismatch': true};
  }

  strengthValidator(control: FormGroup) {
    let hasNumber = /\d/.test(control.value);
    let hasUpper = /[A-Z]/.test(control.value);
    let hasLower = /[a-z]/.test(control.value);

    const valid = hasNumber && hasUpper && hasLower;
    if (!valid) {
        // return what´s not valid
        return { strongPassword: true };
    }
    return null;
  }

  register() {
    localStorage.setItem(Math.floor((Math.random() * 100) + 1).toString(), JSON.stringify(this.registerForm.value));
    this.toastr.success('Zarejestrowano pomyślnie');
    this.router.navigate(['/home']);
  }

  logout() {
    this.cinemaService.logout();
  }
}
