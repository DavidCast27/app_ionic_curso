import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'LocationFormPage';
  tab2Root = 'SearchLocationPage';


  constructor() {

  }
}
