import { Component } from '@angular/core';

import {ScannerPage} from '../../scanner/QRscanner/scanner';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {


  }

  changePage(){
    this.navCtrl.push(ScannerPage);
  }

  
}
