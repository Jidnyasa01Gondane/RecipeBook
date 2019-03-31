import { Injectable } from '@angular/core';
import { Ingredient } from '../Shared/ingrdient.model';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();

  constructor() { }

  private ingredients : Ingredient[] = [
    new Ingredient("Tomato",5),
    new Ingredient("Onions",5)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number) {
    return this.ingredients[index];
  }

  addIngredients(ingrdient: Ingredient) {
    this.ingredients.push(ingrdient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addMultipleIngredients(ingrdients: Ingredient[]) {
    this.ingredients.push(...ingrdients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number) {
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
