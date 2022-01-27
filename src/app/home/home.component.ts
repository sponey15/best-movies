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
  months: any[] = [
    {id:0,name:'Styczeń'},
    {id:1,name:'Luty'},
    {id:2,name:'Marzec'},
    {id:3,name:'Kwiecień'},
    {id:4,name:'Maj'},
    {id:5,name:'Czerwiec'},
    {id:6,name:'Lipiec'},
    {id:7,name:'Sierpień'},
    {id:8,name:'Wrzesień'},
    {id:9,name:'Październik'},
    {id:10,name:'Listopad'},
    {id:11,name:'Grudzień'}
  ];
  currentMonth: any;
  currentMonthId: any;

  constructor(public cinemaService: CinemaService, private router: Router) { 
    if (sessionStorage.getItem('user')) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
    this.currentMonth = 'Styczeń';
    this.currentMonthId = 0;
  }

  ngOnInit(): void {
  }

  logout() {
    this.cinemaService.logout();
    this.loggedInUser = false;
  }

  search() {
    this.router.navigate(['/movie/' + this.selected]);
  }

  nextMonth() {
    if (this.currentMonthId == 11) {
      this.currentMonthId = 0;
      this.currentMonth = this.months[this.currentMonthId].name;
    }
    else {
      this.currentMonthId += 1;
      this.currentMonth = this.months[this.currentMonthId].name;
    }
  }

  prevMonth() {
    if (this.currentMonthId == 0) {
      this.currentMonthId = 0;
      this.currentMonth = this.months[this.currentMonthId].name;
    }
    else {
      this.currentMonthId -= 1;
      this.currentMonth = this.months[this.currentMonthId].name;
    }
  }
}
