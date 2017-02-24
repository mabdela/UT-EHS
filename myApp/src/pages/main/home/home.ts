import { Component, NgZone } from '@angular/core';
//import {ActivityPage} from '../../activity/activity';
//The last four to control the side menu

import { App, MenuController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Platform, AlertController, NavController } from 'ionic-angular';
import { NFC, Ndef, IBeacon, BLE } from 'ionic-native';
import {InAppBrowser, ThemeableBrowser} from 'ionic-native';

import {LoginPage}from '../../login-page/login-page'

declare var cordova:any;


@Component({
  selector: 'home',
  templateUrl: 'home.html'
})


export class HomePage {


  //private nav:NavController = null;//added
  public tag:any;

  static get parameters() {
    return [[Platform], [NavController]];
  }


  constructor(private platform: Platform, private navCtrl: NavController, private alertCtrl: AlertController, private zone: NgZone, public menu: MenuController , public app: App) {
    //this.menu.swipeEnable(false);//side menu disable
    this.platform = platform;
    this.navCtrl = navCtrl;
	  this.tag = {};

  }



  loginPage(){
   // let nav = this.app.getRootNav();
  //nav.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }

 /* activityPage(){
    this.navCtrl.push(ActivityPage);
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

  scan() {
    this.platform.ready().then(() => {
      cordova.plugins.barcodeScanner.scan((result) => {

        //A simple if statement that calls launch_themeable() to display web pages.

        if(result.text=="Lab Coat Guidelines"){

          this.launch_themeable('https://docs.google.com/gview?embedded=true&url=ehs.utoronto.ca/wp-content/uploads/2016/02/Lab-Coat-Guidelines.pdf');

        }else if(result.text=="Chemical Spills"){

          this.launch_themeable('https://ehs.utoronto.ca/report-an-incident/emergency-procedures/chemical-spill-procedures/');

        }else if(result.text=="Fume Hoods User Guidelines"){

          this.launch_themeable('https://docs.google.com/gview?embedded=true&url=ehs.utoronto.ca/wp-content/uploads/2016/12/Fume-Hoods-05-User-Guidelines-Updated.pdf');

        }else if(result.text=="Machine Safety Guidelines"){

          this.launch_themeable('https://docs.google.com/gview?embedded=true&url=ehs.utoronto.ca/wp-content/uploads/2015/10/Machine-Safety-Guidelines-2015.pdf');
        }else{

          alert("Scan Results"+ ': ' +result.text);
        }



      }, (error) => {

        alert("Attention!"+ ': ' +error);


      });
    });
  }

  nfcPage() {
    this.platform.ready().then(() => {
      this.checkNFC();
    });
  }

  checkNFC() {
    NFC.enabled()
	//Success
      .then(() => {
        this.addListenNFC();
      })
	  //failure
      .catch(() => {

		  //confirm alert doesn't work after merge
/* 		let confirm = this.alertCtrl.create({
		title: 'NFC is currently disabled',
		message: 'Please enable NFC',
		buttons: [
			{
			  text: 'Cancel'
			},
			{
			  text: 'Go to Settings',
			  handler: () => { */

			  //use basic alert for now
			  alert("Please enable NFC");
				NFC.showSettings();;
/* 				}
			}
		]
		});
		confirm.present(); */

	  });
  }

    addListenNFC() {
	   NFC.addNdefListener().subscribe(nfcData => {
		   this.parse(nfcData);
	});
  }

  nfcWrite(){

	  let message = Ndef.textRecord('Hello world');

	  NFC.write([message])
		.then( ()=> {
			alert("success");
		})
		.catch( () =>{
			alert("failure");
		});
  }

  parse(nfcData){
	  let payload = nfcData.tag.ndefMessage[0]["payload"];
	  let string_value = this.bin2string(payload);
	  alert("Receved NFC tag: " + string_value);
  }

  beacon(){
	this.platform.ready().then(() => {
      this.bluetooth();
    });

  }

  bluetooth(){
	  BLE.isEnabled()
	  .then( () => {
		this.detect();
	  })
	  .catch( () => {
		alert("Disabled");
		//BLE.showBluetoothSettings();
	  });

  }

  detect(){
	 let beaconRegion = IBeacon.BeaconRegion('deskBeacon','b9407f30-f5f8-466e-aff9-25556b57fe6d');

	IBeacon.startMonitoringForRegion(beaconRegion)
	  .then(
		() => alert("detected"),
		error => console.error('Native layer failed to begin monitoring: ', error)
	  );

  }

	bin2string(array){
		let result = "";
		for(let i = 0; i < array.length; ++i){
			result+= (String.fromCharCode(array[i]));
		}
		return result;
	}

	string2bin(string){

	   let array = new Uint8Array(string.length);
	   for (let i = 0, l = string.length; i < l; i++) {
		   array[i] = string.charCodeAt(i);
		}
		return array.buffer;
	}


}

