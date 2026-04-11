import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  // value for input fields(Dummy for the initial view)
  user = {
    email: '',
    password: '',
  };
  onLogin(form: NgForm) {
    console.log(form.value);
    this.authService.login(form.value).subscribe({
      next: (data: any) => {
        if (data?.data) {
          this.authService.saveToken(data.data);
          // this.authService.saveToken(data.datass);because of type 'any' we can write datass, ts doesnt complain, but it gives run time error,THATS THE DEMERIT OF 'ANY'

          this.router.navigate(['/home']);
          // this.onActionSuccess(data?.message);
        }
      },
      error: (error) => {
        // this.onActionFailure(error);
        // this.authService.removeToken();
      },
    });
  }
}
