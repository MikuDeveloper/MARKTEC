import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { RoutesGuard } from "../model/utils/routes.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    RoutesGuard
  ]
};
