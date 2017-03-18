
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { ActivityPage } from '../activity/activity';
import { SignupPage } from '../signup-page/signup-page';
import { LabPage } from '../activity/subpages/lab/lab'
import { Storage } from '@ionic/storage';
import { Events} from 'ionic-angular';

@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {

  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController, public storage: Storage) {

  }

  ionViewDidLoad() {

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(ActivityPage);
    }, (err) => {
      console.log("Not already authorized");
      this.loading.dismiss();
    });

  }
  
  loaduser(user){
	  let data = user;
  }

  login(){

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
	  
	  this.storage.set('user', this.email);
	  console.log("Login page" + this.email);
      this.navCtrl.setRoot(ActivityPage);
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  
    

  

}
