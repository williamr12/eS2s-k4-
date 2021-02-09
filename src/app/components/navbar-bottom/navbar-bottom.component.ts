import {Component, NgZone, OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar-bottom',
  templateUrl: './navbar-bottom.component.html',
  styleUrls: ['./navbar-bottom.component.css']
})
export class NavbarBottomComponent implements OnInit {

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
