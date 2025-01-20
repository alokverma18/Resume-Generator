import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private resumeDataSource = new BehaviorSubject<any>({});
  resumeData$ = this.resumeDataSource.asObservable();

  updateResumeData(data: any): void {
    this.resumeDataSource.next(data);
  }
}
