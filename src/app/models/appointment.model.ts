export interface AppointmentModel {
  id: string;
  patientName: string;
  email: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}