import { Injectable } from '@angular/core';

import { AlertController, ToastController } from 'ionic-angular';


@Injectable()
export class AlertMessagesProvider {

	constructor(
		private alertCtrl: AlertController,
		private toastCtrl: ToastController) {
		console.log('Hello AlertMessagesProvider Provider');
	}

	presentAlert(title:string, message:string) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: ['ok']
		});
		alert.present();
	}


	presentToast(message:string, position:string) {
		let toast = this.toastCtrl.create({
			message: message,
			duration: 3000,
			position: position
		});

		toast.present();
	}

}



