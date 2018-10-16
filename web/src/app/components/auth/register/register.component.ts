import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
      .then(res =>{
          this.router.navigate(['/main']);
        }, err => console.log(err)
      )
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        console.warn(res);
        this.router.navigate(['/main']);
        // this.errorMessage = "";
        // this.successMessage = "Your account has been created";
      }, err => {
        console.log(err);
        // this.errorMessage = err.message;
        // this.successMessage = "";
      })
  }

}
