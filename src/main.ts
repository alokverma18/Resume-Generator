import { bootstrapApplication } from '@angular/platform-browser';
import { NgIcon, provideIcons, provideNgIconsConfig } from '@ng-icons/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideNgIconsConfig({
      size: '1.3em',
    }),
  ],
}).catch((err) => console.error(err));

