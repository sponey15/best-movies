import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  constructor(private router: Router, private toastr: ToastrService) { }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigate(['/home']);
    this.toastr.success('Wylogowano pomyślnie');
  }
}
