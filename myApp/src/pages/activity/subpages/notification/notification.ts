import { Component } from '@angular/core';

import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';

import { Todos } from '../../../../providers/todos';
import { Auth } from '../../../../providers/auth';

@Component({
  selector: 'notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {

  todos: any;
  loading: any;


  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad(){

    this.todoService.getTodos().then((data) => {
      this.todos = data;
    }, (err) => {
      console.log("not allowed");
    });

  }

  deleteTodo(todo){

    this.showLoader();

    //Remove from database
    this.todoService.deleteTodo(todo._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.todos.indexOf(todo);

      if(index > -1){
        this.todos.splice(index, 1);
      }

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

  }

}
