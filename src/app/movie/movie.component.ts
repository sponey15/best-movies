import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CinemaService } from '../_services/cinema.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  title: any;
  loggedInUser = false;

  constructor(public cinemaService: CinemaService, private route: ActivatedRoute) {
    if (sessionStorage.getItem('user')) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
   }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title')!;
  }

  logout() {
    this.cinemaService.logout();
  }

}
