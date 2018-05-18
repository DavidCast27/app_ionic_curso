import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';

@Injectable()
export class GeolocationProvider {

	constructor(private geolocation: Geolocation) {
		console.log('Hello GeolocationProvider Provider');
	}

	getLocation(callbackSuccess,callbackError){
		this.geolocation.getCurrentPosition().then((resp) => {
			callbackSuccess(resp);
		}).catch((error) => {
			console.log('Error getting location', error);
			callbackError(error);
		});
	}

}
