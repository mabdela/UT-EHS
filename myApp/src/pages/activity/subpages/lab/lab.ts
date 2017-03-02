import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Data } from '../../../../providers/data';
import { LocalNotifications } from 'ionic-native';

@Component({
  selector: 'lab',
  templateUrl: 'lab.html'
})
export class LabPage {

  courses:any;
  
  constructor(public navCtrl: NavController, public dataService: Data) {

  }
  
  ionViewDidLoad() {

    this.dataService.loadCourse().then((data) => {
	  
	  console.log(JSON.stringify(data[0]["Name"]));
      this.courses = data;

    });
  }
  
  Enable(){
	  
	  
  }
  
  Disable(){
	  
	  
	  
  }
}
