import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(firestore: AngularFirestore,
              public authService: AuthService) { }

  ngOnInit(): void {

  }

}
