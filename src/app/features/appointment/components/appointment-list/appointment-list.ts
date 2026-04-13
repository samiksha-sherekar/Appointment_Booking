import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentCard } from '../appointment-card/appointment-card';
import { AppointmentModel } from '../../../../models/appointment.model';
import { Appointment } from '../../../../services/appointment';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, AppointmentCard],
  templateUrl: './appointment-list.html'
})
export class AppointmentList {

  // 📥 Parent se data aayega
  @Input() data: AppointmentModel[] = [];

  // 🔍 Search input
  searchText: string = '';

  constructor(private service: Appointment, public auth: Auth) {}

  // 🔄 Status update (Confirm / Cancel)
 update(event: { id: string; status: 'Confirmed' | 'Cancelled' }) {
  this.service.updateStatus(event.id, event.status);
  this.data = this.service.getAll();
}

  // 🔍 Filter logic
  get filteredData(): AppointmentModel[] {

  const search = (this.searchText || '').toLowerCase();
  const loggedEmail = (this.auth.getEmail() || '').trim().toLowerCase();

  // 👨‍⚕️ ADMIN
  if (this.auth.isAdmin()) {
    if (!search) return this.data;

    return this.data.filter(a =>
      (a.patientName || '').toLowerCase().includes(search)
    );
  }

  // 👤 PATIENT → only own data
  let patientData = this.data.filter(a =>
    ((a.email || '').trim().toLowerCase()) === loggedEmail
  );

  if (!search) return patientData;

  return patientData.filter(a =>
    (a.patientName || '').toLowerCase().includes(search)
  );
}
}