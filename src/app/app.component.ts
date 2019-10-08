import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-autocomplete';

  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges.pipe(
      debounceTime(500),
      tap(() => {
        this.errorMsg = '';
        this.filteredMovies = [];
        this.isLoading = true;
      }),
      switchMap(value => this.http.get('http://www.omdbapi.com/?apikey=f5ccd456&t=' + value)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          }),
        )
      )
    )
      .subscribe(data => {
        // tslint:disable-next-line: no-string-literal
        if (data['Response'] === 'false') {
          // tslint:disable-next-line: no-string-literal
          this.errorMsg = data['Error'];
          this.filteredMovies = [];
        } else {
          this.errorMsg = '';
          // tslint:disable-next-line: no-string-literal
          this.filteredMovies = data['Search'];
        }

        // tslint:disable-next-line: no-string-literal
        console.log(this.filteredMovies['Title']);
        // tslint:disable-next-line: no-string-literal
        this.displayFn(this.filteredMovies['Title']);
      });
  }

  displayFn(movie) {
    return movie;
  }
}
