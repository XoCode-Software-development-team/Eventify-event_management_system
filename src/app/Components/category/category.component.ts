import { Component,Input } from '@angular/core';
import { Category } from 'src/app/Interfaces/interfaces';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
 @Input() CategoryList:Category[] = [];

}
