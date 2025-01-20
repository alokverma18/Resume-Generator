import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { PreviewComponent } from './components/preview/preview.component';

export const routes: Routes = [
    {
        'path': '',
        component: HomeComponent,
    },
    {
        'path': 'home',
        'component': HomeComponent
    },
    {
        'path': 'create',
        'component': FormComponent
    },
    {
        'path': 'preview',
        'component': PreviewComponent
    }

];
