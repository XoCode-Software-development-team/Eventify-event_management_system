import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Agenda,
  AgendaTask,
  Button,
  Checklist,
  Event,
  Task,
} from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ChecklistAgendaService } from 'src/app/Services/checklist-agenda.service';
import { PdfGeneratorService } from 'src/app/Services/pdf-generator.service';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent {
  @ViewChildren('taskInput') taskInput!: QueryList<ElementRef>;

  agendaForm!: FormGroup;
  timeForm!: FormGroup;
  agenda!: Agenda;
  events: Event[] = [];
  eventForm!: FormGroup;
  isLogin: boolean = false;
  eventId!: number;
  agendaId!: number;
  titleName: string = 'Create';

  showTaskField: boolean = true;
  saveButtonLoading: boolean = false;
  exportButtonLoading: boolean = false;
  taskNameErr: boolean = true;
  hasSavedAgenda: boolean = false;
  exportAgenda: boolean = false;
  eventLoading: boolean = false;
  noAgenda: boolean = false;

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
    private _agenda: ChecklistAgendaService,
    private _toast: ToastService,
    private _auth: AuthenticationService,
    private _pdfGenerate: PdfGeneratorService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this._auth.isLoggedIn()) {
      this.isLogin = true;
      this.checkUrl();
    }
  }

  ngAfterViewInit(): void {
    this.getAgendaFromLocal();
  }

  checkUrl() {
    const url = this._router.url;
    if (url === '/event/agenda') {
      this.getAllAgendaEvents();
    } else {
      this._activateRoute.paramMap.subscribe((params) => {
        const id = params.get('id');
        this.eventId = id ? +id : 0; // Converts the string to number and handles null
        // console.log(this.eventId);
        if (this.eventId != 0) {
          this.getAgendaFromDatabase();
        }
      });
    }
  }

  initializeForm() {
    this.timeForm = this.fb.group({
      startTime: '08:00',
      stepTime: ['00:15', this.timeFormatValidator],
    });

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    this.agendaForm = this.fb.group({
      date: [
        new Date().toLocaleDateString('en-CA', options),
        Validators.required,
      ],
      title: ['Untitled agenda', Validators.required],
      description: ['', Validators.required],
      tasks: this.fb.array([this.createTask(0)]),
    });

    this.eventForm = this.fb.group({
      selectedEventId: new FormControl(null, Validators.required),
    });

    this.setStartTime();

    this.agendaForm.valueChanges.subscribe(() => {
      this.ResetButton.disable = false;
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        this.taskNameErr = true;
      } else {
        this.taskNameErr = false;
      }

      
      if(this.agendaForm.invalid) {
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

    this.timeForm.valueChanges.subscribe(() => {
      this.setStartTime();
    });
  }

  setStartTime() {
    if (this.timeForm.get('startTime')?.valid) {
      const startTime = this.timeForm.value.startTime;
      const formattedStartTime = this.convertToAmPm(startTime);
      this.tasks.at(0).get('time')?.setValue(formattedStartTime);
    }
  }

  convertToAmPm(time: string): string {
    const timeParts = time.split(':');
    if (timeParts.length !== 2) return ''; // Invalid time format

    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    if (isNaN(hours) || isNaN(minutes)) return ''; // Invalid numeric values

    const amPm = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;

    return `${this.pad(adjustedHours)}:${this.pad(minutes)} ${amPm}`;
  }

  pad(number: number): string {
    return number < 10 ? '0' + number : number.toString();
  }

  timeFormatValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^\d{2}:\d{2}$/.test(control.value); // Adjusted regex for HH:mm format
    return valid ? null : { invalidTimeFormat: true };
  }

  get tasks(): FormArray {
    return this.agendaForm.get('tasks') as FormArray;
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
          this.tasks.push(this.createTask(index + 1));
          this.moveToNextInput(index + 1);
        }
        this.moveToNextInput(index + 1);
      } else {
        if (
          this.hasTaskValue(index, 'taskDescription') &&
          index === this.tasks.controls.length - 1
        ) {
          this.tasks.push(this.createTask(index + 1));
          this.toggleShowTaskField(true, index);
          this.moveToNextInput(index + 1);
        } else if (this.hasTaskValue(index, 'taskName')) {
          this.tasks.push(this.createTask(index+1));
          this.moveToNextInput(index + 1);
        }
      }
    }
  }

  private createTask(index: number): FormGroup {
    let newTime = this.timeForm.get('startTime')?.value;

    if (index != 0) {
      const step = this.timeForm.get('stepTime')?.value;
      const previousTaskTime = this.tasks.at(index - 1).get('time')?.value;
      newTime = this.increaseTimeByDuration(previousTaskTime, step);
    }

    return this.fb.group({
      time: newTime,
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

  saveAgenda() {
    this.saveButtonLoading = true;

    if (this.agendaForm.valid) {
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        this.saveButtonLoading = false;
        return;
      }
      this.processTasks(this.agendaForm.value.tasks);

      this.deleteEmptyTasks();
      this._agenda.removeAgenda();

      if (this._auth.isLoggedIn()) {
        if (this.events.length > 0) {
          if (this.eventForm.invalid) {
            this.markAllFieldsAsTouched(this.eventForm);
            this.saveButtonLoading = false;
            return;
          }

          console.log(this.eventForm.value);
          console.log(this.agendaForm.value);

          this._agenda
            .saveChecklistInDatabase(
              this.agendaForm.value,
              this.eventForm.value.selectedEventId
            )
            .subscribe({
              next: (res: any) => {
                // console.log(res);
                this._toast.showMessage(res.message, 'success');
                this.getAllAgendaEvents();
                this._router.navigate([`event/view/${this.eventForm.value.selectedEventId}/agenda`])
                this.reset();
                this.saveButtonLoading = false;
              },
              error: (err: any) => {
                this._toast.showMessage('Failed to save agenda', 'error');
                // console.log(err);
                this.saveButtonLoading = false;
              },
            });
        } else {

          if(this.hasSavedAgenda) {

            this._agenda
            .UpdateAgendaInDatabase(
              this.agendaForm.value,
              this.agendaId
            )
            .subscribe({
              next: (res: any) => {
                // console.log(res);
                this._toast.showMessage(res.message, 'success');
                this.getAgendaFromDatabase();
                this.saveButtonLoading = false;
              },
              error: (err: any) => {
                this._toast.showMessage('Failed to update agenda', 'error');
                // console.log(err);
                this.saveButtonLoading = false;
              },
            });

          } else {
            if(this.noAgenda) {
              this._agenda.saveChecklistInDatabase(this.agendaForm.value,this.eventId).subscribe({
                next:(res:any) => {
                  this._toast.showMessage(res.message,'success');
                  this.getAgendaFromDatabase();
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

            this._agenda.saveAgenda(this.agendaForm.value);
            this._toast.showMessage(
              'Create an event to add a agenda.',
              'info'
            );
            this.saveButtonLoading = false;
          }

        }
      } else {
        this._agenda.saveAgenda(this.agendaForm.value);
        this._toast.showMessage('Agenda saved successful!', 'success');
        this.saveButtonLoading = false;
      }
    } else {
      this.markAllFieldsAsTouched(this.agendaForm);
      this._toast.showMessage('Please fill the required field!', 'error');
      this.saveButtonLoading = false;
    }
  }

  reset() {
    this.agendaForm.reset();
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

  getAgendaFromLocal() {
    const agenda = this._agenda.getAgenda();
    console.log(agenda)
    if (agenda) {
      this.agenda = agenda;
      this.hasSavedAgenda = true;
      this.agendaForm.patchValue({
        date: agenda.date,
        title: agenda.title,
        description: agenda.description,
      });

      this.tasks.clear();
      agenda.tasks.forEach((task: AgendaTask) => {
        this.tasks.push(
          this.fb.group({
            time: task.time,
            taskName: task.taskName,
            taskDescription: task.taskDescription,
          })
        );
      });
    }
  }

  getAgendaFromDatabase() {
    this.eventLoading = true;
    this._agenda.getAgendaFromDatabase(this.eventId).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res) {
          this.hasSavedAgenda = true;
          this.saveButton.text = 'Update';
          this.titleName = res.eventName;
          this.agendaId = res.agendaId;
          this.agenda = res.agenda;
          this.agendaForm.patchValue({
            date: this.agenda.date,
            title: this.agenda.title,
            description: this.agenda.description,
          });

          this.tasks.clear();
          this.agenda.tasks.forEach((task: AgendaTask) => {
            this.tasks.push(
              this.fb.group({
                time: task.time,
                taskName: task.taskName,
                taskDescription: task.taskDescription,
              })
            );
          });
        }
        this.eventLoading = false;
      },
      error: (err: any) => {
        if (err) {
          this.noAgenda = true;
          // console.error(err);
          this._toast.showMessage(err.message, 'info');
          if (err.eventName) this.titleName = err.eventName;
        }
        this.eventLoading = false;
      },
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generatePdf() {
    if (!this.agendaForm.valid) {
      this.markAllFieldsAsTouched(this.agendaForm);
      this._toast.showMessage('Please fill the required field!', 'error');
      return;
    }
    this.exportAgenda = true;
    this.exportButtonLoading = true;

    await this.delay(1000);

    const pdfName = `${this.agendaForm.get('title')?.value}`;

    // Perform the PDF generation
    await this._pdfGenerate.generatePdfFromHtml('pdfContent', pdfName);

    // Update the loading state after the PDF generation is done
    this.exportButtonLoading = false;
    this.exportAgenda = false;
  }

  increaseTimeByDuration(time: string, duration: string): string {
    // Check if time and duration are valid strings
    if (!time || !duration) return '';

    // Parse time
    const timeMatch = time.match(/(\d+):(\d+) ([AP]M)/);
    if (!timeMatch) return '';

    const [, hoursStr, minutesStr, period] = timeMatch;
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);

    // Convert time to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    // Parse duration (HH:mm format)
    const durationParts = duration.split(':');
    if (durationParts.length !== 2) return ''; // Invalid duration format
    const durationHours = parseInt(durationParts[0], 10);
    const durationMinutes = parseInt(durationParts[1], 10);

    // Add duration to time
    hours += durationHours;
    minutes += durationMinutes;

    // Handle overflow
    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }
    if (hours >= 24) {
      hours %= 24;
    }

    // Determine new period (AM/PM)
    let newPeriod = 'AM';
    if (hours >= 12) {
      newPeriod = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
    if (hours === 0) {
      hours = 12;
    }

    // Format new time
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${newPeriod}`;
  }

  getAllAgendaEvents() {
    this.eventLoading = true;
    this._agenda.getAgendaEvents().subscribe({
      next: (res: any) => {
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
