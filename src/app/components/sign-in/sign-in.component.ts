import { Component, OnInit } from '@angular/core';

// Import AuthService
import { AuthService } from '../../shared/services/auth.service';

// Forms import
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: ['', Validators.required]
  });


  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
