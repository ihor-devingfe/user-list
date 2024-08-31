import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AbstractUserApi, UserMockApi } from './api';
import { routes } from './app.routes';
import { AbstractUserRepository } from './repositories';
import { UserRepository } from './repositories/user.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
    ),
    { provide: AbstractUserApi, useClass: UserMockApi },
    { provide: AbstractUserRepository, useClass: UserRepository },
  ],
};
