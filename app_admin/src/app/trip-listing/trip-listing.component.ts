import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = [];

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  private getTrips(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
        },
        error: (error: any) => {
          console.error('Error:', error);
        }
      });
  }

  ngOnInit(): void {
    this.getTrips();
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
}