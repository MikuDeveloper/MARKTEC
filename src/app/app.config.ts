import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RoutesGuard } from "../model/utils/routes.guard";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    RoutesGuard,
    provideAnimations(),
    provideToastr({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ]
};
