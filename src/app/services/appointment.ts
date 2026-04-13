import { Injectable } from '@angular/core';
import { AppointmentModel } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class Appointment {

  private key = 'appointments';

  getAll(): AppointmentModel[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  save(data: AppointmentModel[]) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  add(app: AppointmentModel) {
    const list = this.getAll();

    const conflict = list.find(a =>
      a.date === app.date &&
      a.time === app.time &&
      a.doctorName === app.doctorName
    );

    if (conflict) {
      alert('Slot already booked!');
      return false;
    }

    list.push(app);
    this.save(list);
    return true;
  }

  updateStatus(id: string, status: string) {
    const list = this.getAll();
    const index = list.findIndex(a => a.id === id);
    list[index].status = status as any;
    this.save(list);
  }
}