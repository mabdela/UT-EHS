import { Component } from '@angular/core';

import {ScannerPage} from '../../scanner/QRscanner/scanner';
import {ActivityPage} from '../../activity/activity';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {


  }

  scannerPage(){
    this.navCtrl.push(ScannerPage);
  }
  activityPage(){
    this.navCtrl.push(ActivityPage);
  }




}
