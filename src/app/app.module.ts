import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ShoppingService } from './shopping-list/shopping.service';
import { RecipeService } from './recipe/recipe.service';
import { DataStorageService } from './Shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './Shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule
  ],
  providers: [ShoppingService,RecipeService, DataStorageService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
