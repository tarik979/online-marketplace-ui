import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/login-request.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = new LoginRequest(
        this.loginForm.value.email,
        this.loginForm.value.password
      );

      this.authService.login(loginData).subscribe(
        (response) => {
          console.log('Login successful:', response);
          this.authService.setLoggedIn();
          const userRole = localStorage.getItem('userRoles');
          switch (userRole) {
            case 'ROLE_ADMIN':
              this.router.navigate(['/admin/products']);
              break;
            case 'ROLE_BUYER':
              this.router.navigate(['/']);
              break;
            case 'ROLE_SELLER':
              this.router.navigate(['/seller/products']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid email or password';
        }
      );
    }
  }

}
