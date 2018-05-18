import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationFormPage } from './location-form';

@NgModule({
  declarations: [
    LocationFormPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationFormPage),
  ],
})
export class LocationFormPageModule {}
