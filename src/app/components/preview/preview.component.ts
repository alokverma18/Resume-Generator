import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { bootstrapGithub, bootstrapLinkedin, bootstrapEnvelopeAtFill, bootstrapTelephoneFill, bootstrapGeoAltFill } from '@ng-icons/bootstrap-icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DataService } from '../data.service';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  providers: [provideIcons({ bootstrapGithub, bootstrapLinkedin, bootstrapEnvelopeAtFill, bootstrapTelephoneFill, bootstrapGeoAltFill })],
})
export class PreviewComponent {

  resumeData: any = null;
  githubIcon = bootstrapGithub;
  linkedinIcon = bootstrapLinkedin;
  emailIcon = bootstrapEnvelopeAtFill;
  phoneIcon = bootstrapTelephoneFill;
  locationIcon = bootstrapGeoAltFill
  

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.dataService.resumeData$.subscribe((data) => {
      if(data) {
        this.resumeData = data;
        // console.log(this.resumeData)
      } else {
        console.log('No data found');
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
