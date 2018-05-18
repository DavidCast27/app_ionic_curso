import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { FireDatabaseProvider }  from '../../providers/fire-database/fire-database';
import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages'


@IonicPage()
@Component({
	selector: 'page-search-location',
	templateUrl: 'search-location.html',
})
export class SearchLocationPage {

	private searchForm : FormGroup;
	items: Array<any>
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public formBuilder : FormBuilder,
		public fireDB: FireDatabaseProvider,
		public alertMsn: AlertMessagesProvider,
		) {
		this.initForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SearchLocationPage');
	}

	initForm (){
		let today: any = new Date();
		let date = today.toISOString().split('T')[0];
		this.searchForm = this.formBuilder.group({
			date: [date],
			activateDate: [false],
			document: ['', Validators.required ],

		});
	}

	search(){
		
		this.getList(this.searchForm.value)
	}


	getList(data){
		this.fireDB.getLocationList(data.document,this.getListSuccess.bind(this), this.getListError.bind(this));
	}

	getListSuccess(items){
		console.log(items);
		this.items = items;
		if(this.searchForm.value.activateDate){
			this.filterByDate(this.searchForm.value.date);
		}

		if(this.items.length >0){
			this.navCtrl.push('LocationListPage', {list:this.items, data: this.searchForm.value});
		}else{
			this.alertMsn.presentAlert("Ups! Algo salio mal", "No encontro ningun dato");
		}
	}

	getListError(err){
		console.error(err);
	}

	filterByDate(date){
		console.log(date);
		this.items = this.items.filter((item) => {
			return (item.date.toLowerCase().indexOf(date.toLowerCase()) > -1);
		})
	}

	


}
