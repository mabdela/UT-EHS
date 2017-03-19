import { Component } from '@angular/core';
import {ThemeableBrowser} from 'ionic-native';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'reportaccident',
  templateUrl: 'reportaccident.html'
})
export class ReportAccidentPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {


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
