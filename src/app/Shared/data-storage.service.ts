import { Injectable } from '@angular/core';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService,
        private authService: AuthService) {

    }

    storeRecipe() {
        const token = this.authService.getToken();
        return this.httpClient.put('https://ng-recipe-book-ab9d8.firebaseio.com/recipe.json?auth='+token, 
        this.recipeService.getRecipe());
    }

    getRecipes() {
        const token = this.authService.getToken();
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-ab9d8.firebaseio.com/recipe.json?auth='+token)
        .map (
            (recipes) => {
                for (let recipe of recipes) {
                    if(!recipe.ingredients){
                        recipe['ingredients'] = [];
                    }
                }

                return recipes;
            }
        ).subscribe(
            (recipes : Recipe[]) => {
                this.recipeService.setRecipes(recipes); 
            }
        );
    }
}