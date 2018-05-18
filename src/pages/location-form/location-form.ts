import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ValidatorServiceProvider } from '../../providers/validator-service/validator-service';

import { FireDatabaseProvider } from '../../providers/fire-database/fire-database';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

import { AlertMessagesProvider } from '../../providers/alert-messages/alert-messages'

@IonicPage()
@Component({
	selector: 'page-location-form',
	templateUrl: 'location-form.html',
})
export class LocationFormPage {
	private locationForm : FormGroup;


	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams, 
		private formBuilder: FormBuilder,
		public fireDB: FireDatabaseProvider,
		public geolocation: GeolocationProvider,
		public alertMsn: AlertMessagesProvider,
		) {
		this.initForm();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LocationFormPage');
	}

	initForm (){
		this.locationForm = this.formBuilder.group({
			date:[''],
			fullDate:[''],
			latitude: ['', Validators.required],
			longitude: ['', Validators.required],
			mail: ['', [Validators.required,ValidatorServiceProvider.emailValidator] ],
			document: ['',Validators.required]

		});
	}

	saveData(){
		console.log(this.locationForm);
		if (!this.locationForm.invalid) {
			this.fireDB.addLocation(this.locationForm.value,this.addSuccess.bind(this),this.fnError.bind(this));
			this.initForm();
		}else{
			this.alertMsn.presentToast("formulario invalido","bottom");	
		}
		

	}

	generateLocation(){
 		let today: any = new Date();
 		let fullDate:string = today.toISOString();
 		
 		let date:string = fullDate.split('T')[0];
 		console.log(new Date())
 		console.log(fullDate)
 		console.log(date)
 		this.geolocation.getLocation(this.locationSuccess.bind(this),this.fnError.bind(this));
 	}

 	locationSuccess(position){
 		let today: any = new Date();
 		let fullDate:string = today.toISOString();

 		let date:string = fullDate.split('T')[0];
 		let lon = position.coords.longitude
 		let lat = position.coords.latitude
 		let data = {
 			latitude: lat+'',
 			longitude:lon+'',
 			fullDate:fullDate,
 			date:date
 		}
 		this.locationForm.patchValue(data);
 		console.log(position)
 		this.alertMsn.presentToast("Coordenadas recibidas correctamente","bottom");
 	}

 	addSuccess(newPosition){
 		if (newPosition.key != null) {
 			this.alertMsn.presentToast("se guardo", "middle");
 		}
 		
 	}

 	fnError(err, message){
 		console.error(err)
 		//"No se encontraron las coordenadas porfavor vuelvalo a intetntar"
 		this.alertMsn.presentToast(message, "middle");

 	}
 }
