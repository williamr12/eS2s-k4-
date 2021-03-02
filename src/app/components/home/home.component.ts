import {Component, NgZone, OnInit} from '@angular/core';

// Firebase imports
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';

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

  constructor(public firestore: AngularFirestore,
              public authService: AuthService,
              public router: Router,
  ) {}

  ngOnInit(): void {
  }

}
