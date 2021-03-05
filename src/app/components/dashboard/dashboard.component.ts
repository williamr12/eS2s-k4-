import { Component, OnInit} from '@angular/core';

// Import AuthService
import { AuthService } from '../../shared/services/auth.service';

// Import Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,

  ) { }

  ngOnInit(): void { }

}
