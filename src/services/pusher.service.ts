import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

declare const Pusher: any;
@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  channel: any;

    constructor() {
      

      this.pusher = new Pusher(environment.pusher.key, {
        cluster: environment.pusher.cluster,
        encrypted: true
      });
      

      if(localStorage.getItem('category') == "waitress")
        this.channel = this.pusher.subscribe('local');  
      if(localStorage.getItem('category') == "delivery employer")
        this.channel = this.pusher.subscribe('delivery'); 

      
    }
  
}
