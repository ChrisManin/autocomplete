import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-autocomplete';
  myControl = new FormControl();
  states;

  constructor() {
    this.loadStates();
  }

  // build list of states as map of key-value pairs
  loadStates() {
    const allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    Wisconsin, Wyoming';
    // tslint:disable-next-line: only-arrow-functions
    this.states = allStates.split(/, +/g).map(function(state) {
      return {
        value: state.toUpperCase(),
        display: state
      };
    });
  }
}
