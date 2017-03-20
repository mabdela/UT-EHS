import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import { TabsPage } from '../pages/main/tabs/tabs';

import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { Todos } from '../providers/todos';
import { Auth } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  loading: any;

  notification:Array<{title:string, message:string}>=[];



  constructor(platform: Platform, public push: Push, public modalCtrl: ModalController, public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
	this.push.register().then((t: PushToken) => {
		return this.push.saveToken(t);
		}).then((t: PushToken) => {
			console.log('Token saved:', t.token);
			});

	this.push.rx.notification()
	.subscribe((msg) => {

    alert(this.notification[0].title+":"+this.notification[0].message);
	  //this.notification.push({title:msg.title, message:msg.text});
    //this.addTodo();


		});
  }


  /*addTodo(){


    this.todoService.createTodo(this.notification[0]).then((result) => {
      this.loading.dismiss();
      console.log("todo created");
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });

  }


  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }*/
}
