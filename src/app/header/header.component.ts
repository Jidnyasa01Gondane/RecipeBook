import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService: DataStorageService) { }

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
}
