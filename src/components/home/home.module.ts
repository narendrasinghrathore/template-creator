import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { DialogGreetingFormModule } from '../dialog-greeting-form/dialog-greeting-form.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: HomeComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    DialogGreetingFormModule,
  ],
})
export class HomeModule {}
