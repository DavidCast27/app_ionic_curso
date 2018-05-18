import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
	selector: 'page-location-list',
	templateUrl: 'location-list.html',
})
export class LocationListPage {

	items: Array<any>
	data:any;
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		) {
		this.initializeItems()
		this.data = this.navParams.get("data");
	}

	initializeItems(){
		this.items = this.navParams.get('list');
	}


	getItems(ev: any) {
		this.initializeItems();
		let val = ev.target.value;
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return (item.mail.toLowerCase().indexOf(val.toLowerCase()) > -1);
			})
		}

	}

	goToMap(){
		this.navCtrl.push('MapPage', {items: this.items})
	}


}
