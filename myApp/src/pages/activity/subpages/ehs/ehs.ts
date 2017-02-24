import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ThemeableBrowser} from 'ionic-native';

@Component({
  selector: 'ehs',
  templateUrl: 'ehs.html'
})
export class EHSPage {

  constructor(public navCtrl: NavController) {

  }

  launch_themeable( arg){
    let options = {
      statusbar: {
        color: '#ffffffff'
      },
      toolbar: {
        height: 44,
        color: '#2B547E'
      },
      title: {
        color: '#f0f0f0ff',
        showPageTitle: true
      },
      backButton: {
        image: 'ic_action_previous_item',
        imagePressed: 'ic_action_previous_item',
        align: 'left',
        event: 'backPressed'

      },

      backButtonCanClose: true
    };

    let browser = new ThemeableBrowser(arg, '_blank', options);


  }


}
