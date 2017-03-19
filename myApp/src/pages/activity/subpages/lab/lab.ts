import { Component, ViewChild } from '@angular/core';
import { NavController, Events} from 'ionic-angular';
import { Data} from '../../../../providers/data';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from 'ionic-native';

@Component({
  selector: 'lab',
  templateUrl: 'lab.html'
})
export class LabPage {

  courses:any;
  username:any;
  
  
  constructor(public navCtrl: NavController, public dataService: Data, public storage: Storage) {

  }

  ionViewDidLoad() {
	  this.storage.get('user').then((value) => {

        this.username = value;
		
		console.log("Inside the storage " + this.username);
		
		if(this.username == null){
			this.username == "mycourse";
		}
		this.dataService.loadCourse(this.username).then((course) => {
			console.log(JSON.stringify(course[1]["Name"]));
			this.courses = course;
		});
      });
  }
  
  Enable(){
	  LocalNotifications.schedule([{
		  id: 1,
		  text: "ECE 361 is coming up",
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
