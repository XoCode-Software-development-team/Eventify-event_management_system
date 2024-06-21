import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Button, Checklist, Task } from 'src/app/Interfaces/interfaces';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ChecklistAgendaService } from 'src/app/Services/checklist-agenda.service';
import { PdfGeneratorService } from 'src/app/Services/pdf-generator.service';
import { ToastService } from 'src/app/Services/toast.service';

export interface Agenda {
  date: Date;
  title: string;
  description: string;
  tasks: AgendaTask[];
}

export interface AgendaTask {
  time: string;
  taskName: string;
  taskDescription: string;
}

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

  showTaskField: boolean = true;
  saveButtonLoading: boolean = false;
  exportButtonLoading: boolean = false;
  taskNameErr: boolean = true;
  hasSavedAgenda: boolean = false;
  exportAgenda: boolean = false;

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
    private _agenda: ChecklistAgendaService,
    private _toast: ToastService,
    private _auth: AuthenticationService,
    private _pdfGenerate: PdfGeneratorService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngAfterViewInit(): void {
    if (!this._auth.isLoggedIn()) {
      this.getAgendaFromLocal();
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

    this.agendaForm.valueChanges.subscribe(() => {
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        this.taskNameErr = true;
      } else {
        this.taskNameErr = false;
      }
    });

    this.timeForm.valueChanges.subscribe(() => {
      if (this.timeForm.get('startTime')?.valid) {
        const startTime = this.timeForm.value.startTime;
        const formattedStartTime = this.convertToAmPm(startTime);
        this.tasks.at(0).get('time')?.setValue(formattedStartTime);
      }
    });
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
          this.tasks.push(this.createTask(index + 1));
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

  saveAgenda() {
    this.saveButtonLoading = true;
    if (this.agendaForm.valid) {
      if (
        this.tasks.controls.length === 1 &&
        !this.hasTaskValue(0, 'taskName')
      ) {
        return;
      }
      this.deleteEmptyTasks();
      console.log(this.agendaForm.value);
      this._agenda.removeAgenda();
      this._agenda.saveAgenda(this.agendaForm.value);
      this._toast.showMessage('Agenda saved successful!', 'success');
      this.saveButtonLoading = false;
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

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async generatePdf() {
    this.exportAgenda = true;
    this.exportButtonLoading = true;

    await this.delay(1000);

    const pdfName = `${this.agenda.title}`;

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
}
