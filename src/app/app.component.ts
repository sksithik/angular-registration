import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  registrationForm = this.fb.group({
    fullName: [null, [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    country: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern('[0-9 ]{10}')]],
    password: ['', Validators.required],
    tos: ['', Validators.required],
  });
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private toastrService:ToastrService) { }
  selectedCountryCode = 'us';
  countryCodes = ['us', 'lu', 'de', 'bs', 'br', 'pt'];

  changeSelectedCountryCode(value: any): void {
    this.selectedCountryCode = value;
  }
  onSubmit() {
    this.submitted = true;
    
    
    if (!this.registrationForm.valid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    var userExists=localStorage.getItem('user');
    if(this.registrationForm.value.email=== userExists){
      this.toastrService.error('user already exists');
      return;
    }
    this.toastrService.success('registration successful');
    localStorage.setItem('user',this.registrationForm.value.email);
    // TODO: Use EventEmitter with form value
    console.warn(this.registrationForm);
  }
  showPassword() {
    var password = document.getElementById('password');
    if (password) {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      var iconToggle = document.getElementById('passwordToggle');
      if (iconToggle)
        iconToggle.classList.toggle('bi-eye');

    }
  }
}