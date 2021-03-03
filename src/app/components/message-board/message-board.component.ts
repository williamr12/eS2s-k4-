import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';

// Firebase imports
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

// Import AuthService
import {AuthService} from '../../shared/services/auth.service';

// Import Router
import {Router} from '@angular/router';

// Forms import
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent implements OnInit {

  @ViewChild('messageBoard') private myScrollContainer: ElementRef;

  // Variable for user message in form
  messageForm = new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]);

  // Observer Messages from Firestore
  messages: Observable<any[]>;

  constructor(firestore: AngularFirestore,
              public authService: AuthService,
              public router: Router,
  ) {

    // Query all messages from firestore and sorting by date
    this.messages = firestore.collection('/messages', ref =>
      ref.orderBy('date')).valueChanges();

  }

  ngOnInit(): void {

    // Keeps message display at most recent
    this.scrollToBottom();

  }

  // Keeps message display at most recent
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  // Keeps message display at most recent
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
