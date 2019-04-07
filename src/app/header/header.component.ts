import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataStorageService, public authService: AuthService,
    private router : Router) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataService.storeRecipe().subscribe(
      (respose: Response) => {
        console.log(respose);
      }
    );
  }

  onFetchData() {
    this.dataService.getRecipes();
  }

  onLogOut() {
    this.authService.logout();
    this.router.navigate(['signin']);
  }
}
