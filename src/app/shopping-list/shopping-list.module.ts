import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthModule
  ]
})
export class ShoppingListModule { }
