import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nombre: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { nombre, password } = this.loginForm.value;

    this.authService.login(nombre, password).subscribe({
      next: (res: any) => {
        if (res.token) {
          // Guardamos token, nombre y rol
          this.authService.setToken(res.token);
          localStorage.setItem('usuario', JSON.stringify({ nombre: nombre, rol: res.rol }));

          Swal.fire({
            title: '¡Éxito!',
            text: 'Login realizado correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            // Redirigimos al dashboard
            this.router.navigate(['/dashboard']);
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Error',
          text: err.error?.message || 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }
}
