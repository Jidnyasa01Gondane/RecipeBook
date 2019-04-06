import { Injectable } from '@angular/core';

import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {

    }

    storeRecipe() {
        return this.httpClient.put('https://ng-recipe-book-ab9d8.firebaseio.com/recipe.json', 
        this.recipeService.getRecipe());
    }

    getRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-ab9d8.firebaseio.com/recipe.json')
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