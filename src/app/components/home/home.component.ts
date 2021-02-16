import {Component, NgZone, OnInit} from '@angular/core';

// Firebase imports
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Import AuthService
import { AuthService } from '../../shared/services/auth.service';

// Import Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: Observable<any[]>;

  constructor(firestore: AngularFirestore,
              public authService: AuthService,
              public router: Router,
              public ngZone: NgZone,
  ) {
    this.users = firestore.collection('/users').valueChanges();
  }

  ngOnInit(): void {
  }

}
