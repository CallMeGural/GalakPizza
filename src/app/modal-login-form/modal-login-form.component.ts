import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-modal-login-form',
  templateUrl: './modal-login-form.component.html',
  styleUrls: ['./modal-login-form.component.css']
})
export class ModalLoginFormComponent implements OnInit {
  username: string;
  password: string;
  userForm: FormGroup;
  isLoggedIn: boolean;
  isAdmin: boolean;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private toastr: ToastrService) {
      this.isLoggedIn=false;
      this.isAdmin=false;
    }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required,Validators.minLength(8)]],
    });
}

  loginUser() {
    if(this.userForm.valid) {
      this.storageService.loginUser(this.userForm.get('username')?.value,this.userForm.get('password')?.value)
      .pipe(
        catchError(error => {
        throw 'Wrong username or password';
      }))
      .subscribe(
          data => {
            this.storageService.saveUser(data).subscribe(()=> {
              this.toastr.success("Zalogowano poprawnie","Logowanie");
              this.reloadPage();
            })
          }
        );
    }
    else this.toastr.error("Błędne dane","Logowanie");
  }

  reloadPage(): void {
    this.dialog.closeAll();
    window.location.reload();
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }
}
