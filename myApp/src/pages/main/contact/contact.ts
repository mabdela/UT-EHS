import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';


@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	

  constructor(public navCtrl: NavController) {
	

  }
  
  launch(){
	let browser = new InAppBrowser('https://ionic.io', '_blank', 'location=no');

	
	  
  }
  


}
