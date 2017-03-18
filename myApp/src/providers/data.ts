import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Data {

  data: any;
  course: any;

  constructor(public http: Http) {

  }

  load(){

    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions.json').map(res => res.json()).subscribe(data => {


        this.data = data.questions;

        for (var i = 0; i < this.data.length - 1; i++) {
          var j = i + Math.floor(Math.random() * (this.data.length - i));

          var temp = this.data[j];
          this.data[j] = this.data[i];
          this.data[i] = temp;
        }
        this.data.splice(0,10);
        resolve(this.data);
      });



    });





  }
  
    loadCourse(){

    if(this.course){
      return Promise.resolve(this.course);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/mycourse.json').map(res => res.json()).subscribe(data => {
        this.course = data.myCourse;
        resolve(this.course);
      });

    });

  }



}
