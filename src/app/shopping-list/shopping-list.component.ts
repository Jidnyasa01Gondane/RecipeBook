import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingrdient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[] ;
  subscription: Subscription;

  constructor(private shoppingService: ShoppingService, private authService: AuthService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingService.startingEditing.next(index);
  }
}
