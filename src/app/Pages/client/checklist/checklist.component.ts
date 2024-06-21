import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Button, Checklist, Task } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ChecklistAgendaService } from 'src/app/Services/checklist-agenda.service';
import { PdfGeneratorService } from 'src/app/Services/pdf-generator.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit, AfterViewInit {
  @ViewChildren('taskInput') taskInput!: QueryList<ElementRef>;

  checkListForm!: FormGroup;
  checklist!: Checklist;

  showTaskField: boolean = true;
  saveButtonLoading: boolean = false;
  exportButtonLoading: boolean = false;
  taskNameErr: boolean = true;
  hasSavedChecklist: boolean = false;
  exportChecklist: boolean = false;

  saveButton: Button = {
    url: '',
    type: 'submit',
    text: `Save`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: false,
  };

  ResetButton: Button = {
    url: '',
    type: 'reset',
    text: `Reset`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: false,
  };

  ExportButton: Button = {
    url: '',
    type: 'submit',
    text: `Export`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: false,
  };

  constructor(
    private fb: FormBuilder,
    private _checklist: ChecklistAgendaService,
    private _toast: ToastService,
    private _auth: AuthenticationService,
    private _pdfGenerate: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (!this._auth.isLoggedIn()) {
      this.getChecklistFromLocal();
    }
  }

  initializeForm() {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    this.checkListForm = this.fb.group({
      date: [
        new Date().toLocaleDateString('en-CA', options),
        Validators.required,
      ],
      title: ['Untitled checklist', Validators.required],
      description: ['', Validators.required],
      tasks: this.fb.array([this.createTask()]),
    });

    this.checkListForm.valueChanges.subscribe(() => {
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        this.taskNameErr = true;
      } else {
        this.taskNameErr = false;
      }
    });
  }

  get tasks(): FormArray {
    return this.checkListForm.get('tasks') as FormArray;
  }

  toggleShowTaskField(show: boolean, index: number) {
    this.showTaskField = show;
    this.moveToNextInput(index);
  }

  handleEnterKey(event: KeyboardEvent, index: number) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (this.showTaskField) {
        if (
          (this.hasTaskValue(index, 'taskName') ||
            this.hasTaskValue(index, 'taskDescription')) &&
          index === this.tasks.controls.length - 1
        ) {
          this.tasks.push(this.createTask());
          this.moveToNextInput(index + 1);
        }
        this.moveToNextInput(index + 1);
      } else {
        if (
          this.hasTaskValue(index, 'taskDescription') &&
          index === this.tasks.controls.length - 1
        ) {
          this.tasks.push(this.createTask());
          this.toggleShowTaskField(true, index);
          this.moveToNextInput(index + 1);
        } else if (this.hasTaskValue(index, 'taskName')) {
          this.tasks.push(this.createTask());
          this.moveToNextInput(index + 1);
        }
      }
    }
  }

  private createTask(): FormGroup {
    return this.fb.group({
      checked: false,
      taskName: '',
      taskDescription: '',
    });
  }

  deleteTask(index: number, name: string) {
    if (name === 'taskName') {
      if (this.hasTaskValue(index, 'taskDescription')) {
        this.clearTaskInputs(index, name);
      } else {
        this.tasks.removeAt(index);
      }
    } else {
      if (this.hasTaskValue(index, 'taskName')) {
        this.clearTaskInputs(index, name);
      } else {
        this.tasks.removeAt(index);
      }
    }
  }

  hasTaskValue(index: number, name: string): boolean {
    const taskControl = this.tasks.at(index).get(name);
    return (
      taskControl && taskControl.value && taskControl.value.trim().length > 0
    );
  }

  clearTaskInputs(index: number, name: string): void {
    const control = this.tasks.at(index);
    if (name === 'taskName') {
      control.patchValue({
        taskName: '',
      });
    } else {
      control.patchValue({
        taskDescription: '',
      });
    }
  }

  deleteEmptyTasks() {
    for (let i = this.tasks.controls.length - 1; i >= 0; i--) {
      const taskGroup = this.tasks.at(i) as FormGroup;
      const taskName = taskGroup.get('taskName')?.value;
      const taskDescription = taskGroup.get('taskDescription')?.value;

      if (!taskName && !taskDescription) {
        this.tasks.removeAt(i);
      }
    }
  }

  saveChecklist() {
    this.saveButtonLoading = true;
    if (this.checkListForm.valid) {
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        return;
      }
      this.deleteEmptyTasks();
      console.log(this.checkListForm.value);
      this._checklist.removeChecklist();
      this._checklist.saveChecklist(this.checkListForm.value);
      this._toast.showMessage('Checklist saved successful!', 'success');
      this.saveButtonLoading = false;
    } else {
      this.markAllFieldsAsTouched(this.checkListForm);
      this._toast.showMessage('Please fill the required field!', 'error');
      this.saveButtonLoading = false;
    }
  }

  reset() {
      this.checkListForm.reset();
      this.initializeForm();
  }

  markAllFieldsAsTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markAllFieldsAsTouched(control);
      }
    });
  }

  moveToNextInput(index: number) {
    setTimeout(() => {
      const taskInputArray = this.taskInput.toArray();
      taskInputArray[index]?.nativeElement?.focus();

      if (index < taskInputArray.length) {
      }
    }, 0);
  }

  getChecklistFromLocal() {
    const checklist = this._checklist.getChecklist();
    if (checklist) {
      this.checklist = checklist;
      this.hasSavedChecklist = true;
      this.checkListForm.patchValue({
        date: checklist.date,
        title: checklist.title,
        description: checklist.description,
      });

      this.tasks.clear();
      checklist.tasks.forEach((task: Task) => {
        this.tasks.push(
          this.fb.group({
            checked: task.checked,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
          })
        );
      });
    }
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generatePdf() {
    this.exportChecklist = true;
    this.exportButtonLoading = true;

    await this.delay(1000);

    const pdfName = `${this.checklist.title}`

    // Perform the PDF generation
    await this._pdfGenerate.generatePdfFromHtml('pdfContent',pdfName);

    // Update the loading state after the PDF generation is done
    this.exportButtonLoading = false;
    this.exportChecklist = false;
  }
}
