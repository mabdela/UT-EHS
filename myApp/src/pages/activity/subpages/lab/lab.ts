
import { Component } from '@angular/core';
import { courseParse } from '../../../../providers/courseParse';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'lab',
  templateUrl: 'lab.html'
})
export class LabPage {

  constructor(public parse: courseParse, public navCtrl: NavController) {

  }
  
  course(){
	  this.parse.getData().subscribe( (data) => {
	    alert(JSON.stringify(data));
	  });
	  
  }
  
}
