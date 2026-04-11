import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [HttpClientModule, RouterLink, FormsModule, CommonModule],
  standalone: true,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  signup() {
    const payload = {
      name: 'Vandana',
      password: '123456',
      email: 'kvandana451@gmail.com',
    };
    // this.http
    //   .post('http://localhost:3000/api/signup', payload)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // this.http.get('http://localhost:3000/api/tweets').subscribe((data) => {
    //   console.log(data);
    // });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .get('http://localhost:3000/api/tweets', { headers })
      .subscribe((data) => {
        console.log(data);
      });
  }

  // Input field values (dummy for the initial view):

  user = {
    name: 'Alex Bob',
    password: '',
    email: 'alex@gmail.com',
  };

  onSignUp(form: NgForm) {
    console.log(form.value);
    this.authService.signUp(form.value).subscribe({
      next: (data: Object) => {
        // type of data is Object typescript inferes it by defualt automatically
        console.log('data and type of data is', data, typeof data);
        // this.onActionSuccess(data?.message);
        // no need to add a check for response comming from Api i.e data(it can be Object,null as well)
        // TypeScript says: data should be Object
        // Runtime JavaScript: does not enforce it
        // and oly in this block we are not using data anyway, so no need for the check
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        // this.onActionFailure(error);
        console.log('error', error);
      },
    });
  }
}
