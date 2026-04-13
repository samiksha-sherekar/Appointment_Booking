import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// import { AppointmentService } from 'src/app/services/appointment.service';
import { AppointmentForm } from '../../components/appointment-form/appointment-form';
import { AppointmentList } from '../../components/appointment-list/appointment-list';
import { Appointment } from '../../../../services/appointment';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-appointment-page',
  imports: [CommonModule,AppointmentList,AppointmentForm],
  templateUrl: './appointment-page.html'
})
export class AppointmentPage {
  today = new Date();

  appointments: any[] = [];

  constructor(private service: Appointment,public auth: Auth) {
    this.load();
  }

  load() {
    this.appointments = this.service.getAll();
  }
}