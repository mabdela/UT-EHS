import { Component, NgZone } from '@angular/core';
import {ActivityPage} from '../../activity/activity';
import {Platform, AlertController, NavController} from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';
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
	  let string_value = this.bin2string(payload)
	  alert("Receved NFC tag: " + string_value);
  }
  
  
bin2string(array){
	let result = "";
	for(let i = 0; i < array.length; ++i){
		result+= (String.fromCharCode(array[i]));
	}
	return result;
}




}
