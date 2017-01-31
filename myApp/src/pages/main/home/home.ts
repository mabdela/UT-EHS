import { Component } from '@angular/core';
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

  static get parameters() {
    return [[Platform], [NavController]];
  }

  constructor(private platform: Platform, private navCtrl: NavController, private alertCtrl: AlertController) {
    this.platform = platform;
    this.navCtrl = navCtrl;
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
        let msg = this.alertCtrl.create({
          subTitle : "NFC DISABLED",
          buttons: [{ text : "OK"},{ text : "Go Setting",
            handler : () => {
              NFC.showSettings();
            }
          }]
        });
        msg.present();
      });
  }
  
    addListenNFC() {
   NFC.addNdefListener().subscribe(nfcData => {
   alert("Receved NFC tag: " + JSON.stringify(nfcData));
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
  




}
