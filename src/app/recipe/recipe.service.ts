import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../Shared/ingrdient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Burger', 
    'Burger King',
    'https://amp.thisisinsider.com/images/5bbd187101145529745a9895-1536-1152.jpg',
    [
      new Ingredient('Bun',1),
      new Ingredient('Fries',20),
      new Ingredient('Coke',1)
    ]
    ),
    new Recipe('Coffee', 
    'Hot Coffee - Refreshes the mind',
    'https://www.sciencenews.org/sites/default/files/main/articles/100315_coffee_opener_NEW_0.jpg',
     [
      new Ingredient('Milk',1),
      new Ingredient('Coffee Beans',1),
    ]
    )
  ];
  constructor(private shoppingService : ShoppingService) { }

  getRecipe() {
    return this.recipes.slice();
  }

  getRecipebyId(id: number) {
    return this.recipes.slice()[id];
  }
  addIngredientsToShoppingList(ingrdient: Ingredient[]) {
    this.shoppingService.addMultipleIngredients(ingrdient);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes:Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
