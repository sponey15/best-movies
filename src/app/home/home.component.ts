import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from '../_services/cinema.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser = false;
  selected?: string;
  movies: string[] = [
    'Spider-man: Bez drogi do domu Dubbing',
    'Diuna Napisy',
    'Diuna Dubbing',
    'Matrix Zmartwychwstania Dubbing',
    'Matrix Zmartwychwstania Napisy'
  ];

  constructor(public cinemaService: CinemaService, private router: Router) { 
    if (sessionStorage.getItem('user')) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.cinemaService.logout();
  }

  search() {
    this.router.navigate(['/movie/' + this.selected]);
  }
}
