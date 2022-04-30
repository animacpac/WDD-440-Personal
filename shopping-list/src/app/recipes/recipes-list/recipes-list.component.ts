import { Component, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipes[] = [
    new Recipes('Creme Brule', 'This is a test','https://i0.wp.com/www.livewellbakeoften.com/wp-content/uploads/2019/02/Homemade-Creme-Brulee-2.jpg?w=745&ssl=1'),
    new Recipes('Chocolate Pudding', 'This is a test','https://www.spendwithpennies.com/wp-content/uploads/2018/08/Horizon-Organic-SpendWithPennies-Chocolate-Pudding-22.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
