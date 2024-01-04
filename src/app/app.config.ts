import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AuthGuard } from "../model/utils/auth.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AuthGuard
  ]
};
