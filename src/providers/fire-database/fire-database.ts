import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FireDatabaseProvider {

  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello FireDatabaseProvider Provider');
  }

  getLocationList(document, callbackSuccess,callbackError){
  	return  this.afDB.list('/'+document).valueChanges().subscribe(data => {
  		callbackSuccess(data)
  	}, error =>{
  		callbackError(error);
  	})
  }

  addLocation(data:any, callbackSuccess,callbackError){
  	let document:string = data.document;
  	let location = this.afDB.list('/'+document);
  	let newData = location.push(data)
    newData.then(data=>{
      console.log(data);
      callbackSuccess(data)
    }, err=>{
     console.error(err)
     let message = "no se guardo"
     callbackError(err,message)
    })

  }


}
