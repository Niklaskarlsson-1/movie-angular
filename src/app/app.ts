import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./app.css'],
  template: `
    <div class="container">
      <h1>🎬 Movie App</h1>

      <div *ngIf="!movies.length" class="loading">Loading movies...</div>

      <div class="movies-grid" *ngIf="movies.length">
        <div class="movie-card" *ngFor="let movie of movies">
          <h2>{{ movie.title }}</h2>

          <p>📅 {{ movie.year }}</p>

          <p class="rating">⭐ {{ getRandomRating() }}/10</p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  movies: any[] = [];

  constructor(
    private http: HttpClient,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.http.get<any[]>('https://movie-api-vrmb.onrender.com/movies').subscribe((data) => {
      this.movies = data;
      this.cd.detectChanges();
    });
  }

  getRandomRating(): number {
    return Math.floor(Math.random() * 4) + 7;
  }
}
