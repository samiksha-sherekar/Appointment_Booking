import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Appointment } from '../../../../services/appointment';
import { CommonModule } from '@angular/common';
import { InputField } from '../../../../shared/components/input-field/input-field';
import { Auth } from '../../../../services/auth';
// import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  imports: [CommonModule, ReactiveFormsModule, InputField],
  templateUrl: './appointment-form.html'
})
export class AppointmentForm {

  @Output() refresh = new EventEmitter();

  doctors = ['Dr. Sharma', 'Dr. Patel'];
  minDate: string = '';
  constructor(private fb: FormBuilder, private service: Appointment, public auth: Auth) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

 
  form = new FormGroup({
    patientName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]+$')]),
    doctorName: new FormControl('', [Validators.required,]),
    date: new FormControl('', [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    // email: new FormControl('', [Validators.required, Validators.email])
  });
  slots = this.generateSlots();

  generateSlots() {
  const s = [];

  for (let i = 9; i <= 21; i++) {
    s.push(this.formatTime(i, '00'));
    s.push(this.formatTime(i, '30'));
  }

  return s;
}

formatTime(hour: number, min: string) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const h = hour > 12 ? hour - 12 : hour;
  return `${h}:${min} ${suffix}`;
}

  isBooked(slot: string) {
    const list = this.service.getAll();
    return list.some(a =>
      a.date === this.form.value.date &&
      a.time === slot
    );
  }

  submit() {
    if (this.form.invalid) return;

    const success = this.service.add({
      id: Date.now().toString(),
      email: this.auth.getEmail() || '',
      ...this.form.value,
      status: 'Pending'
    } as any);
    
    console.log('Appointment added:', this.auth.getEmail(), this.form.value);
    if (success) {
      alert('Appointment Booked ✅');
      this.form.reset();
      this.refresh.emit();
    }
  }
}