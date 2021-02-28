import {Component, NgZone, OnInit} from '@angular/core';

// Firebase imports
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

// Import AuthService
import { AuthService } from '../../shared/services/auth.service';

// Import Router
import { Router } from '@angular/router';

// Import User
import { User } from '../../shared/services/user';

// Import RxJS
import { Observable } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<any[]>;

  constructor(public firestore: AngularFirestore,
              public authService: AuthService,
              public router: Router,
              public ngZone: NgZone,
  ) {
    this.users = this.firestore.collection(`users/`).valueChanges();
  }

  ngOnInit(): void {
  }

}
