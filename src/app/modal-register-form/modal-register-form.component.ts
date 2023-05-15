import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-register-form',
  templateUrl: './modal-register-form.component.html',
  styleUrls: ['./modal-register-form.component.css']
})
export class ModalRegisterFormComponent implements OnInit {
  user = new User();
  registrationForm: FormGroup;


  constructor(public dialog: MatDialog,public formBuilder: FormBuilder,
    private storageService: StorageService,private toastr: ToastrService) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/)]],

    });
}

onSubmit() {
  if (this.registrationForm.valid && 
    this.registrationForm.get('confirmPassword')?.value==this.registrationForm.get('password')?.value) {
    this.toastr.success("Zalogowano poprawnie","Rejestracja");
    this.user.firstname=this.registrationForm.get('firstName')?.value;
    this.user.lastname=this.registrationForm.get('lastName')?.value;
    this.user.username=this.registrationForm.get('username')?.value;
    this.user.password=this.registrationForm.get('password')?.value;
    this.user.phoneNumber=this.registrationForm.get('phoneNumber')?.value;
    this.storageService
        .registerUser(this.user)
        .subscribe();
      this.dialog.closeAll();
  }
  else
    this.toastr.error("Błędne dane","Rejestracja");
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
}
