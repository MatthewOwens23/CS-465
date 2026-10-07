import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {

  @Input() trip: any;

  constructor(private router: Router) {}

  editTrip(trip: any) {
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }
}