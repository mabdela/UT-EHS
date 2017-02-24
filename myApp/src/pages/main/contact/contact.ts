import { Component} from '@angular/core';
import { NavController  } from 'ionic-angular';
import {InAppBrowser, ThemeableBrowser} from 'ionic-native';


@Component({
  selector: 'contact',
  templateUrl: 'contact.html'
})
export class ContactPage {


  constructor(public navCtrl: NavController) {



  }

  /*launch_in_app(){
	let browser = new InAppBrowser('https://ehs.utoronto.ca/wp-content/uploads/2017/01/Chemical-Storage-Table-Updated.pdf', '_blank', 'location=no');
  }*/

  launch_themeable( arg){
	  let options = {
     statusbar: {
         color: '#ffffffff'
     },
     toolbar: {
         height: 44,
         color: '#2B547E'
     },
     title: {
         color: '#f0f0f0ff',
         showPageTitle: true
     },
     backButton: {
		image: 'ic_action_previous_item',
        imagePressed: 'ic_action_previous_item',
        align: 'left',
        event: 'backPressed'

     },

     backButtonCanClose: true
};

let browser = new ThemeableBrowser(arg, '_blank', options);


  }


}
