import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class courseParse {

constructor(private http: Http) { }

getData(){
	return this.http.get('courseParse')
		.map((res) => res.json());
	}
}