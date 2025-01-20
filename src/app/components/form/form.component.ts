import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  resumeForm: FormGroup;
  resumeData: any = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    private fb: FormBuilder) {
    this.resumeForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      linkedIn: [''],
      github: [''],
      careerObjective: ['', Validators.required],
      education: this.fb.array([
        this.createEducationFormGroup()
      ]),
      experience: this.fb.array([
        this.createExperienceFormGroup()
      ]),
      projects: this.fb.array([
        this.createProjectFormGroup()
      ]),
      skills: 
        this.createSkillFormGroup()
    });
  }

  get education(): FormArray {
    return this.resumeForm.get('education') as FormArray;
  }

  get experience(): FormArray {
    return this.resumeForm.get('experience') as FormArray;
  }

  get projects(): FormArray {
    return this.resumeForm.get('projects') as FormArray;
  }

  get skills(): FormArray {
    return this.resumeForm.get('skills') as FormArray;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      degree: ['', Validators.required],
      college: ['', Validators.required],
      year: ['', Validators.required],
      gpa: ['']
    });
  }

  createExperienceFormGroup(): FormGroup {
    return this.fb.group({
      role: ['', Validators.required],
      company: ['', Validators.required],
      duration: ['', Validators.required],
      details: ['']
    });
  }

  createProjectFormGroup(): FormGroup {
    return this.fb.group({
      title: ['', Validators.required],
      description: [''],
      tools: [''],
      link: ''
    });
  }

  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      languages: [''],
      frameworks: [''],
      tools: ['']
    });
  }

  addEducation(): void {
    this.education.push(this.createEducationFormGroup());
  }

  removeEducation(index: number): void {
    this.education.removeAt(index);
  }

  addExperience(): void {
    this.experience.push(this.createExperienceFormGroup());
  }

  removeExperience(index: number): void {
    this.experience.removeAt(index);
  }

  addProject(): void {
    this.projects.push(this.createProjectFormGroup());
  }

  removeProject(index: number): void {
    this.projects.removeAt(index);
  }

  addSkill(): void {
    this.skills.push(this.createSkillFormGroup());
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.resumeForm.valid) {
      this.resumeData = this.resumeForm.value;
      this.dataService.updateResumeData(this.resumeData);
      this.router.navigate(['preview']);
    } else {
      console.log(this.resumeForm);
      console.log(this.resumeForm.errors);
      alert('Please fill out all required fields!');
    }
  }

  downloadPDF(): void {
    const content = document.getElementById('resume-preview');
    if (content) {
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

        if (imgHeight > pageHeight) {
          let remainingHeight = imgHeight - pageHeight;
          while (remainingHeight > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            remainingHeight -= pageHeight;
          }
        }

        pdf.save('resume.pdf');
      });
    }
  }
}

