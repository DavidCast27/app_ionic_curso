import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {
	GoogleMaps,
	GoogleMap,
	GoogleMapsEvent,
	GoogleMapOptions,
	CameraPosition,
	MarkerOptions,
	Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
	selector: 'page-map',
	templateUrl: 'map.html',
})
export class MapPage {

	map: GoogleMap;
	markets: Array<any>;

	constructor( public navParams: NavParams,
		public navCtrl: NavController,
		public googleMaps: GoogleMaps,) { }


	ionViewDidLoad() {
		this.markets = this.navParams.get("items");
		this.loadMap();
	}

	loadMap() {
		let mapOptions: GoogleMapOptions = {
			camera: {
				target: {
					lat: 43.0741904,
					lng: -89.3809802
				},
				zoom: 5,
				tilt: 30
			}
		};

		this.map = this.googleMaps.create('map_canvas', mapOptions);
		this.map.one(GoogleMapsEvent.MAP_READY)
		.then(() => {
			console.log()
			let latitude: number = 0;
			let longitude: number = 0;
			
			this.markets.forEach(market =>{
				console.log(market);
				latitude += Number(market.latitude);
				longitude += Number(market.longitude);
				console.log(latitude, longitude)
				this.addPosition(market)	
			})

			latitude = latitude/this.markets.length;
			longitude = longitude/ this.markets.length;
			this.moveCenter(latitude,longitude);
			

		})
		.catch(error =>{
			console.log(error);
		});
	}

	addPosition(market):void {
		let currentMarket: MarkerOptions = {
			title: market.mail,
			icon: 'blue',
			animation: 'DROP',
			position : {lat: Number(market.latitude), lng :Number(market.longitude)}
		}
		
		this.map.addMarker(currentMarket);
	}

	moveCenter(latitude,longitude){
		this.map.moveCamera({
			target: {lat: latitude, lng :longitude}
		});
	}



}
