import { Component} from '@angular/core';

import { NavController  } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';


@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(public navCtrl: NavController) {



  }



  launch(){
	let browser = new InAppBrowser('https://ehs.utoronto.ca/wp-content/uploads/2017/01/Chemical-Storage-Table-Updated.pdf', '_blank', 'location=yes');



  }



}
