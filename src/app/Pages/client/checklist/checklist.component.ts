import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Button, Checklist, Event, Task } from 'src/app/Interfaces/interfaces';
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
  events: Event[] = [];
  eventForm!: FormGroup;
  eventId!: number;
  checklistId!:number;
  titleName: string = 'Create';

  showTaskField: boolean = true;
  saveButtonLoading: boolean = false;
  exportButtonLoading: boolean = false;
  taskNameErr: boolean = true;
  hasSavedChecklist: boolean = false;
  NoChecklist:boolean = false;
  exportChecklist: boolean = false;
  eventLoading: boolean = false;

  saveButton: Button = {
    url: '',
    type: 'submit',
    text: `Save`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: true,
  };

  ResetButton: Button = {
    url: '',
    type: 'reset',
    text: `Reset`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: true,
  };

  ExportButton: Button = {
    url: '',
    type: 'submit',
    text: `Export`,
    icon: '',
    iconClass: ['hideIcon'], // Scss class list
    class: [],
    disable: true,
  };

  constructor(
    private fb: FormBuilder,
    private _checklist: ChecklistAgendaService,
    private _toast: ToastService,
    private _auth: AuthenticationService,
    private _pdfGenerate: PdfGeneratorService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this._auth.isLoggedIn()) {
      this.checkUrl();
    }
  }

  ngAfterViewInit(): void {
    this.getChecklistFromLocal();
  }

  checkUrl() {
    const url = this._router.url;
    if (url === '/event/checklist') {
      this.getAllChecklistEvents();
    } else {
      this._activateRoute.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.eventId = id ? +id : 0; // Converts the string to number and handles null
        // console.log(this.eventId);
        if (this.eventId != 0) {
          this.getChecklistFromDatabase();
        }
      });
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

    this.eventForm = this.fb.group({
      selectedEventId: new FormControl(null, Validators.required),
    });

    this.checkListForm.valueChanges.subscribe(() => {
      this.ResetButton.disable = false;
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        this.taskNameErr = true;
      } else {
        this.taskNameErr = false;
      }

      if(this.checkListForm.invalid) {
        this.saveButton.disable = true;
        this.ExportButton.disable = true;
      } else {
        if (
          this.tasks.controls.length === 1 &&
          !this.hasTaskValue(0, 'taskName')
        ) {
          this.saveButton.disable = true;
          this.ExportButton.disable = true;
        } else {
          this.saveButton.disable = false;
          this.ExportButton.disable = false;
        }
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

  processTasks(tasks: Task[]) {
    for (let i = 0; i < tasks.length - 1; i++) {
      if (
        tasks[i].taskDescription === '' &&
        tasks[i + 1].taskName === '' &&
        tasks[i + 1].taskDescription !== ''
      ) {
        tasks[i].taskDescription = tasks[i + 1].taskDescription;
        tasks.splice(i + 1, 1);
        i--; // Adjust index after removing an element
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
        this.saveButtonLoading = false;
        return;
      }
      this.processTasks(this.checkListForm.value.tasks);

      this.deleteEmptyTasks();
      this._checklist.removeChecklist();

      if (this._auth.isLoggedIn()) {
        if (this.events.length > 0) {
          if (this.eventForm.invalid) {
            this.markAllFieldsAsTouched(this.eventForm);
            this.saveButtonLoading = false;
            return;
          }

          console.log(this.eventForm.value);
          console.log(this.checkListForm.value);

          this._checklist
            .saveChecklistInDatabase(
              this.checkListForm.value,
              this.eventForm.value.selectedEventId
            )
            .subscribe({
              next: (res: any) => {
                // console.log(res);
                this._toast.showMessage(res.message, 'success');
                this.getAllChecklistEvents();
                this._router.navigate([`event/view/${this.eventForm.value.selectedEventId}/checklist`])
                this.reset();
                this.saveButtonLoading = false;
              },
              error: (err: any) => {
                this._toast.showMessage('Failed to save checklist', 'error');
                // console.log(err);
                this.saveButtonLoading = false;
              },
            });
        } else {

          if(this.hasSavedChecklist) {

            this._checklist
            .UpdateChecklistInDatabase(
              this.checkListForm.value,
              this.checklistId
            )
            .subscribe({
              next: (res: any) => {
                // console.log(res);
                this._toast.showMessage(res.message, 'success');
                this.getChecklistFromDatabase();
                this.saveButtonLoading = false;
              },
              error: (err: any) => {
                this._toast.showMessage('Failed to update checklist', 'error');
                // console.log(err);
                this.saveButtonLoading = false;
              },
            });

          } else {
            if(this.NoChecklist) {
              this._checklist.saveChecklistInDatabase(this.checkListForm.value,this.eventId).subscribe({
                next:(res:any) => {
                  this._toast.showMessage(res.message,'success');
                  this.getChecklistFromDatabase();
                  this.saveButtonLoading = false;
                },
                error:(err:any) => {
                  if(err) {
                    this._toast.showMessage(err.message,'error');
                    
                  }
                  this.saveButtonLoading = false;
                }
              })
              return
            }

            this._checklist.saveChecklist(this.checkListForm.value);
            this._toast.showMessage(
              'Create an event to add a checklist.',
              'info'
            );
            this.saveButtonLoading = false;
          }

        }
      } else {
        this._checklist.saveChecklist(this.checkListForm.value);
        this._toast.showMessage('Checklist saved successful!', 'success');
        this.saveButtonLoading = false;
      }
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
    // console.log(checklist)
    if (checklist) {
      this.checklist = checklist;
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

  getChecklistFromDatabase() {
    this.eventLoading = true;
    this._checklist.getChecklistFromDatabase(this.eventId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          this.hasSavedChecklist = true;
          this.saveButton.text = 'Update';
          this.titleName = res.eventName;
          this.checklistId = res.checklistId;
          this.checklist = res.checklist;
          this.checkListForm.patchValue({
            date: this.checklist.date,
            title: this.checklist.title,
            description: this.checklist.description,
          });

          this.tasks.clear();
          this.checklist.tasks.forEach((task: Task) => {
            this.tasks.push(
              this.fb.group({
                checked: task.checked,
                taskName: task.taskName,
                taskDescription: task.taskDescription,
              })
            );
          });
        }
        this.eventLoading = false;
      },
      error: (err: any) => {
        if(err) {
          this.NoChecklist = true;
          // console.error(err);
          this._toast.showMessage(err.message,'info');
          if(err.eventName)
            this.titleName = err.eventName;
        }
        this.eventLoading = false;
      },
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generatePdf() {
    if (!this.checkListForm.valid) {
      this.markAllFieldsAsTouched(this.checkListForm);
      this._toast.showMessage('Please fill the required field!', 'error');
      return;
    }
    this.exportChecklist = true;
    this.exportButtonLoading = true;

    await this.delay(1000);

    const pdfName = `${this.checkListForm.get('title')?.value}`;

    // Perform the PDF generation
    await this._pdfGenerate.generatePdfFromHtml('pdfContent', pdfName);

    // Update the loading state after the PDF generation is done
    this.exportButtonLoading = false;
    this.exportChecklist = false;
  }

  getAllChecklistEvents() {
    this.eventLoading = true;
    this._checklist.getChecklistEvents().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.events = res;
        this.eventLoading = false;
      },
      error: (err: any) => {
        // console.log(err);
        this.eventLoading = false;
      },
    });
  }
}
