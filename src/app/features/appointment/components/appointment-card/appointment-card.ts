import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentModel } from '../../../../models/appointment.model';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-card.html'
})
export class AppointmentCard {

  @Input() data!: AppointmentModel;

  @Output() statusChange = new EventEmitter<{
    id: string;
    status: 'Confirmed' | 'Cancelled';
  }>();

  constructor(public auth: Auth) {}
  
  confirm() {
    this.statusChange.emit({
      id: this.data.id,
      status: 'Confirmed'
    });
  }

  cancel() {
    this.statusChange.emit({
      id: this.data.id,
      status: 'Cancelled'
    });
  }
}