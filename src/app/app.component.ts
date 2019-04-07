import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature ="recipe";
  
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyACZXXoMXyePmn2y2QZ2YRFe7P0kYkA0uY",
      authDomain: "ng-recipe-book-ab9d8.firebaseapp.com",
    });
  }

  onNavigate (feature: string) {
    this.loadedFeature = feature;
  }
}
