import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataService } from '../data.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {

  resumeData: any = {
    "name": "Alok Kumar Verma",
    "location": "Chennai",
    "email": "as1492@srmist.edu.in",
    "phone": "08707685353",
    "linkedIn": "alokverma18",
    "github": "alokverma18",
    "careerObjective": "this.resumeData",
    "education": [
        {
            "degree": "B.Tech",
            "college": "SRMIST",
            "year": "2021-25",
            "gpa": "9.78"
        }
    ],
    "experience": [
        {
            "role": "Intern",
            "company": "BNY",
            "duration": "June 2024- August 2024",
            "details": "this.resumeData"
        }
    ],
    "projects": [
        {
            "title": "SmartGrid",
            "description": "this.resumeData",
            "tools": "Angular, Python, HTML",
            "link": "this.resumeData"
        }
    ],
    "skills": {
        "languages": "Angular, Python, HTML",
        "frameworks": "Angular, Python, HTML",
        "tools": "Angular, Python, HTML"
    }
};

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.resumeData$.subscribe((data) => {
      if(data.length > 0) {
        this.resumeData = data;
        console.log(this.resumeData)
      }
    });
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
