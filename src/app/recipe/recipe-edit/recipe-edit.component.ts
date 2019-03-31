import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editRecipe = false;
  recipeForm: FormGroup;

  constructor(private router: ActivatedRoute, 
    private rcipeService: RecipeService, private routers: Router) { }

  ngOnInit() {
    this.router.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editRecipe = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDecription = "";
    let recipeIngredients = new FormArray([]);

    if(this.editRecipe) {
      const recipe = this.rcipeService.getRecipebyId(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDecription = recipe.discription;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup(
              {
                'name' : new FormControl(ingredient.name, Validators.required),
                'amount' : new FormControl(ingredient.amount, [
                  Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              }
            )
          )
        }
      }
    }
    this.recipeForm = new FormGroup( {
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDecription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'], 
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']);
    if(this.editRecipe){
      this.rcipeService.updateRecipe(this.id, newRecipe);
    }
    else {
      this.rcipeService.addRecipe(newRecipe);
    }
    this.routers.navigate(['/recipes']);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name' : new FormControl(null, Validators.required),
          'amount' : new FormControl(null,[
            Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }
      )
    );
  }

  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.routers.navigate(['../'], {relativeTo: this.router});
  }
}
