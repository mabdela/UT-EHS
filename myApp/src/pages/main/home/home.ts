import { Component, NgZone } from '@angular/core';

//import {ActivityPage} from '../../activity/activity';
//The last four to control the side menu

import { App, MenuController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { Platform, AlertController, NavController } from 'ionic-angular';
import { NFC, Ndef, IBeacon, BLE } from 'ionic-native';
import {InAppBrowser, ThemeableBrowser, LocalNotifications} from 'ionic-native';

import {LoginPage}from '../../login-page/login-page'
import {ActivityPage} from '../../activity/activity';

declare var cordova:any;

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})

export class HomePage {

  //private nav:NavController = null;//added
  public tag:any;
  ListenerAdded:number;
  greenBeacon:number;
  blueBeacon:number;

  static get parameters() {
    return [[Platform], [NavController]];
  }


  constructor( private platform: Platform, private navCtrl: NavController, private alertCtrl: AlertController, private zone: NgZone, public menu: MenuController , public app: App) {
    //this.menu.swipeEnable(false);//side menu disable
    this.platform = platform;
    this.navCtrl = navCtrl;
	//this.beaconCount = 0
	this.tag = {};
	this.ListenerAdded = 0;
	this.blueBeacon = 0;
	this.greenBeacon = 0;

  }



  loginPage(){
   // let nav = this.app.getRootNav();
  //nav.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }

 /* activityPage(){
    this.navCtrl.push(ActivityPage);
  }*/

  launch_themeable(arg){
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

  //Add a variable so can only added lisenter once
  checkNFC() {
    NFC.enabled()
	//Success
      .then(() => {
		  console.log(this.ListenerAdded);
		  if(this.ListenerAdded == 0){
			this.addListenNFC();  
		  }
			

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
	  this.ListenerAdded = 1;
	   NFC.addNdefListener().subscribe(nfcData => {
		   this.parse(nfcData);
	});
  }


  parse(nfcData){
	  let payload = nfcData.tag.ndefMessage[0]["payload"];
	  let string_value = this.bin2string(payload);
	  alert("Receved NFC tag: " + string_value);
	  this.launch_themeable(string_value);
  }

  beacon(){
	this.platform.ready().then(() => {
      this.bluetooth();
    });

  }

  bluetooth(){
	  BLE.isEnabled()
	  .then( () => {
		  //alert(this.beaconCount);
		  //alert("hello");
		  //if(this.beaconCount%2 == 0){ //Enable monitoring
			
					this.detect();	
				
				
		 // }
		  //else{ //disable monitoring
			//  this.disable();
		  //}
		
		
		//this.beaconCount++;
	  })
	  .catch( () => {
		alert("Disabled");
		BLE.showBluetoothSettings();
	  });
	  
	  

  }

  detect(){
	// Request permission to use location on iOS
	IBeacon.requestAlwaysAuthorization();
	// create a new delegate and register it with the native layer
	let delegate = IBeacon.Delegate();

	// Subscribe to some of the delegate's event handlers
	delegate.didStartMonitoringForRegion()
	  .subscribe(
	   data => {console.log('didStartMonitoringForRegion: ', data);}
		//error => console.error();
	  );
	  
	delegate.didEnterRegion()
	  .subscribe(
		data => {
			console.log('didEnterRegion: ', data);
			let page = data.region.identifier;
			//alert("ENTER REGION " + page);
		    //will need some lookup table for the different beacons
			if(page == "LabGoggles" && !greenBeacon){
					alert(page);
					//this.launch_themeable("https://ehs.utoronto.ca/");
			}
			if(page == "LabCoat" && !blueBeacon){ //Think there may be a bug if themable browser gets launched twice
					//this.launch_themeable("https://ehs.utoronto.ca/resources/");
			}
			
		}
	  );
	  
	  
	  delegate.didExitRegion()
	  .subscribe(
		data => {
			console.log('didExitRegion: ', data);
			let page = data.region.identifier;
			//alert("EXIT REGION " + page);
		    //will need some lookup table for the different beacons
			if(page == "LabGoggles"){
					//maybe add a variable here so only opens once every day
					//this.launch_themeable("https://ehs.utoronto.ca/");
					this.greenBeacon = 1;
			}
			if(page == "LabCoat"){ //Think there may be a bug if themable browser gets launched twice
					this.blueBeacon = 1;
					//this.launch_themeable("https://ehs.utoronto.ca/resources/");
			}
			
		}
	  );
	

	let blueBeacon = IBeacon.BeaconRegion('LabGoggles','b9407f30-f5f8-466e-aff9-25556b57fe6e');
	let greenBeacon = IBeacon.BeaconRegion('LabCoat','b9407f30-f5f8-466e-aff9-25556b57fe6d');
	
	IBeacon.startMonitoringForRegion(blueBeacon)
	  .then(
		(data) => {console.log('startMonitoringForRegion: ' + data);
		}
	  );
	  
	  IBeacon.startMonitoringForRegion(greenBeacon)
	  .then(
		(data) => {console.log('startMonitoringForRegion: ' + data);
		}
	  );

  }
  
  disableBeacon(){
	  let blueBeacon = IBeacon.BeaconRegion('LabGoggles','b9407f30-f5f8-466e-aff9-25556b57fe6e');
	  let greenBeacon = IBeacon.BeaconRegion('LabCoat','b9407f30-f5f8-466e-aff9-25556b57fe6d');
	  IBeacon.stopMonitoringForRegion(greenBeacon);
	  IBeacon.stopMonitoringForRegion(blueBeacon);
  }

  bin2string(array){
    let result = "";
    for(let i = 0; i < array.length; ++i){
      result+= (String.fromCharCode(array[i]));
    }
    return result;
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

}

