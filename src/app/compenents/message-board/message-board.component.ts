import {Component, NgZone, OnInit} from '@angular/core';

// Firebase imports
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

// Import AuthService
import {AuthService} from '../../shared/services/auth.service';

// Import Router
import {Router} from '@angular/router';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent implements OnInit {

  messages: Observable<any[]>;

  constructor(firestore: AngularFirestore,
              public authService: AuthService,
              public router: Router,
              public ngZone: NgZone,
  ) {
    this.messages = firestore.collection('/messages', ref =>
      ref.orderBy('date')).valueChanges();

  }

  ngOnInit(): void {
  }

}
