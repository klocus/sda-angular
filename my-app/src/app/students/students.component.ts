import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  delete(student: Student): void {
    this.students = this.students.filter(s => s !== student);
    this.studentService.deleteStudent(student).subscribe();
  }

  add(name: string, email: string): void {
    // Usunięcie białych znaków z danych
    name = name.trim();
    email = email.trim();

    // Zaprzestanie wykonywania, kiedy pola są puste
    if (!name || !email) {
      return;
    }

    // Zaprzestanie wykonywania, kiedy adres e-mail nie zawiera "@"
    if (email.indexOf('@') < 1) {
      return;
    }

    // Przesłanie danych do serwera i zaktualizowanie lokalnej tablicy
    this.studentService.addStudent({ name, email } as Student)
      .subscribe(student => {
        this.students.push(student);
      });
  }

}
