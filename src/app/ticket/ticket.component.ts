import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CinemaService } from '../_services/cinema.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  title: any;
  date: any;
  hour: any;
  toggle = true;
  loggedInUser = false;
  price = 0;
  quantity = 0;

  constructor(private route: ActivatedRoute, private router: Router, public cinemaService: CinemaService) {
    if (sessionStorage.getItem('user')) {
      this.loggedInUser = true;
    } else {
      this.loggedInUser = false;
    }
   }

  ngOnInit(): void {
    this.title = this.route.snapshot.paramMap.get('title')!;
    this.date = this.route.snapshot.paramMap.get('date')!;
    this.hour = this.route.snapshot.paramMap.get('hour')!;
  }

  logout() {
    this.cinemaService.logout();
  }

  enableDisableRule(state: any) {
    if (state == false) {
      this.quantity -= 1;
      this.price -= 20;
    } else {
      this.quantity += 1;
      this.price += 20;
    }
    this.toggle = !this.toggle;
  }
}
