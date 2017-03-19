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


  //Related to the display of stuff
  data: any;

  constructor(public navCtrl: NavController, public todoService: Todos, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad(){

    this.todoService.getTodos().then((result) => {
      this.data = result;
      console.log(this.data);
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

  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }


}
