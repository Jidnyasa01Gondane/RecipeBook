import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm} from '@angular/forms';
import { Ingredient } from 'src/app/Shared/ingrdient.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slform : NgForm;

  subscrption : Subscription;
  editMode = false;
  editItemIndex : number;
  editedIngredient : Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscrption = this.shoppingService.startingEditing.subscribe(
      (index:number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedIngredient = this.shoppingService.getIngredient(index);
        this.slform.setValue(
          {
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          }
        )
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newitem = new Ingredient(value.name,value.amount);
    if(this.editMode) {
      this.shoppingService.updateIngredient(this.editItemIndex, newitem);
    }else {
    this.shoppingService.addIngredients(newitem);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscrption.unsubscribe();
  }
}
