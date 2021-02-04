import { Component, OnInit } from '@angular/core';

// Firebase imports
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.users = firestore.collection('/users').valueChanges();
  }

  ngOnInit(): void {
  }

}
