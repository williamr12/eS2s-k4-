import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update-information',
  templateUrl: './update-information.component.html',
  styleUrls: ['./update-information.component.css']
})
export class UpdateInformationComponent implements OnInit {

  updateInformationForm = this.formBuilder.group({
    displayName: [null, Validators.required],
    photoURL: [null, Validators.required],
  });

  constructor(public authService: AuthService,
              public router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

}
