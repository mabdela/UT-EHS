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
	  
	  console.log(JSON.stringify(data[1]["Name"]));
      this.courses = data;

    });
  }
  
  Enable(){
	  LocalNotifications.schedule([{
		  id: 1,
		  text: "NOTIFICATION",
	  },
	  {
		  id: 2,
		  text: this.courses[0]["Name"] + "is coming up",
		  firstAt: this.courses[0]["firstAt"],
		  every: "week"
	  },
	  {
		  id: 3,
		  text: this.courses[1]["Name"] + "is coming up",
		  firstAt: this.courses[1]["firstAt"],
		  every: "week"
	  },
	  	  {
		  id: 4,
		  text: this.courses[2]["Name"] + "is coming up",
		  firstAt: this.courses[2]["firstAt"],
		  every: "week"
	  },
	  {
		  id: 5,
		  text: this.courses[3]["Name"] + "is coming up",
		  firstAt: this.courses[3]["firstAt"],
		  every: "week"
	  },
	  {
		  id: 6,
		  text: this.courses[4]["Name"] + "is coming up",
		  firstAt: this.courses[4]["firstAt"],
		  every: "week"
	  }
	  ]);
  }
  
  Disable(){
	  LocalNotifications.clearAll();
	  
  }
  
  schedule(index){ //Need to add disable for each lab
	  LocalNotifications.schedule({
		  id: index,
		  text: this.courses[index]["Name"] + "is coming up",
		  firstAt: this.courses[index]["firstAt"],
		  every: "week"	  
	  });  
  }
}
