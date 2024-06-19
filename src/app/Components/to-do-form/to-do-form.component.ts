import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-to-do-form',
  templateUrl: './to-do-form.component.html',
  styleUrls: ['./to-do-form.component.scss']
})
export class ToDoFormComponent {
  @Output() EmitTaskData : EventEmitter<any> = new EventEmitter<any>();

  @Input()
  includeTaskTime: boolean = true;
  

  ToDoForm!: FormGroup;
  

  constructor() { }


  ngOnInit() {
    this.ToDoForm = new FormGroup({
      date : new FormControl(null,Validators.required),
      title : new FormControl(null,Validators.required),
      descriptions: new FormArray([])
    });

    // add initial question and answer fields
    this.generateTaskGroup();
  }

  // Function to add a new question
  generateTaskGroup() {
    const descriptions = new FormGroup({
      descriptionText: new FormControl(''),
      checkListTasks: new FormArray([])
    });
    this.listOfTaskGroup.push(descriptions);
    this.addTask(this.listOfTaskGroup.length - 1); // Add an initial answer field for the newly added question
  }

  // Function to remove a question
  removeTaskGroup(i: number): void {
    this.listOfTaskGroup.removeAt(i);
  }

  // Function to add a new task to a description
   addTask(i: number) {
    const taskGroup = this.includeTaskTime ? new FormGroup({
      taskName: new FormControl(''),
      taskTime: new FormControl('')
    }) : new FormGroup({
      taskName: new FormControl('')
    });

    this.getTaskControls(i).push(taskGroup);
  }

  // Function to remove an answer from a question
  removeTask(i: number, j: number) {
    this.getTaskControls(i).removeAt(j);
  }

  // Getter for easier access to the question FormArray
  get listOfTaskGroup(): FormArray {
    return this.ToDoForm.get('descriptions') as FormArray;
  }

  // Getter for easier access to the answer FormArray of a question
  getTaskControls(i: number): FormArray {
    const taskArray = this.listOfTaskGroup.at(i) as FormGroup;
    return taskArray.get('checkListTasks') as FormArray;
  }

  trackByFn(index: number, item: any) {
    return index; // or item.id if you have unique identifiers
  }


// onSubmit() {
//   // this.formData = this.ToDoForm.value;
//   if (this.ToDoForm.valid) {
//     this.EmitTaskData.emit(this.ToDoForm.value);
//     console.log(this.ToDoForm.getRawValue());
//   } else {
//     this.ToDoForm.markAllAsTouched();
//   }
 
  // this.ToDoForm.reset();
// }

onSubmit() {
  if (this.ToDoForm.valid) {
    const formData = this.ToDoForm.value;
    if (!this.includeTaskTime) {
      formData.descriptions.forEach((description: any) => {
        description.checkListTasks.forEach((task: any) => {
          delete task.taskTime;
        });
      });
    }
    this.EmitTaskData.emit(formData);
    console.log(formData);
  } else {
    this.ToDoForm.markAllAsTouched();
  }
}
}
