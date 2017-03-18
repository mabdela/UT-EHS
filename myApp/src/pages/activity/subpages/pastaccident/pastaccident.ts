import { Component, ViewChild } from '@angular/core';
import { NavController} from 'ionic-angular';
import {ThemeableBrowser} from 'ionic-native';
import { Past } from '../../../../providers/past';

@Component({
  selector: 'pastaccident',
  templateUrl: 'pastaccident.html'
})
export class PastAccidentPage {

  reports:any;


  constructor(public navCtrl: NavController, public dataService: Past) {

  }

  ionViewDidLoad() {

    this.dataService.load().then((past) => {


      this.reports = past;
    });

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

