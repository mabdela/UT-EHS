
import { Component } from '@angular/core';
import {Platform, AlertController, NavController} from 'ionic-angular';
declare var cordova:any;

@Component({
  templateUrl: 'scanner.html'
})
export class ScannerPage {

  //private nav:NavController = null;//added

  static get parameters() {
    return [[Platform], [NavController]];
  }

  constructor(private platform: Platform, private nav: NavController, private alertCtrl: AlertController) {
    this.platform = platform;
    this.nav = nav;
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
}
