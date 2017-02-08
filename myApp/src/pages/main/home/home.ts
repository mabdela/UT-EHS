import { Component, NgZone } from '@angular/core';
import {ActivityPage} from '../../activity/activity';
import {Platform, AlertController, NavController} from 'ionic-angular';
import { NFC, Ndef, IBeacon, BLE,ThemeableBrowser } from 'ionic-native';
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

  constructor(private platform: Platform, private navCtrl: NavController, private alertCtrl: AlertController, private zone: NgZone) {
    this.platform = platform;
    this.navCtrl = navCtrl;
	this.tag = {};
  }

  activityPage(){
    this.navCtrl.push(ActivityPage);
  }

  scan() {
    this.platform.ready().then(() => {
      cordova.plugins.barcodeScanner.scan((result) => {

        alert("Scan Results"+ ': ' +result.text);



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
		  if(this.listener == 0){
			  this.listener = 1;
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
		this.detect();
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
	delegate.didRangeBeaconsInRegion()
	  .subscribe(
		data => {console.log('didRangeBeaconsInRegion: ', data);}

	  );
	delegate.didStartMonitoringForRegion()
	  .subscribe(
	   data => {console.log('didStartMonitoringForRegion: ', data);}
		//error => console.error();
	  );
	delegate.didEnterRegion()
	  .subscribe(
		data => {
		  console.log('didEnterRegion: ', data);
		}
	  );

	let beaconRegion = IBeacon.BeaconRegion('deskBeacon','b9407f30-f5f8-466e-aff9-25556b57feee');

	IBeacon.startMonitoringForRegion(beaconRegion)
	  .then(
		() => {alert("Success"); this.launch_themeable("Beacon");}
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

  launch_themeable(content){
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
	    
		if (content == 'Beacon'){
			content = 'https://ehs.utoronto.ca/our-services/laser-safety/laser-safety-course/';
		}
		let browser = new ThemeableBrowser(content, '_blank', options);		
	}

}

