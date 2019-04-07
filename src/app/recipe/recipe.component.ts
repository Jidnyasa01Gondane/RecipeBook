import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
}
