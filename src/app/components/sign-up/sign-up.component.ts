import { Component, OnInit } from '@angular/core';

// Import AuthService
import { AuthService } from '../../shared/services/auth.service';

// Forms import
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  createAccountForm = this.formBuilder.group({
    displayName: [null, Validators.required],
    email: [null, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void{ }

}
