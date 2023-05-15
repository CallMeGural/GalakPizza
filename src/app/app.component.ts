import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Pizza } from './model/pizza';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title: string;
  isLoggedIn=false;
  order: Array<Pizza> = [];

  constructor(private storageService: StorageService){
    this.title = 'GalakPizza - najlepsza pizza w kosmosie';
  }
  ngOnInit(): void {
    this.isLoggedIn=this.storageService.isLoggedIn();
    sessionStorage.setItem('order',JSON.stringify(this.order));
    if(this.isLoggedIn) {
      const user = this.storageService.getToken();
    }
  }

}
