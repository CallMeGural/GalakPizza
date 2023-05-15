import { Component } from '@angular/core';
import { ModalLoginFormComponent } from '../modal-login-form/modal-login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalRegisterFormComponent } from '../modal-register-form/modal-register-form.component';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../services/storage.service'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {

  username: string;
  password: string;
  dialogRef: any;
  user: User;
  user$: Observable<any>;
  isAdmin=false;
  isUser=false;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public storageService: StorageService,
    private router : Router) {
      this.user$=storageService.getUserFromToken();
      this.user$.subscribe((user) => {
        if (user && user.role === 'ADMIN') {
          this.isAdmin = true;
          this.isUser = false;
        } else if (user && user.role === 'USER') {
          this.isUser = true;
          this.isAdmin = false;
        } else {
          this.isAdmin = false;
          this.isUser = false;
        }
      });
  }

  

  openRegisterDialog(): void {
    this.router.navigate(['/'])
    this.dialogRef = this.dialog.open(ModalRegisterFormComponent, {
      data: {user: this.user},
    });
  }

  openLoginDialog(): void {
    this.router.navigate(['/'])
    this.dialogRef = this.dialog.open(ModalLoginFormComponent, {
      data: {name: this.username, animal: this.password},
    });
  }

  logout() {
    this.storageService.clean();
    this.reloadPage();
    this.toastr.success("Wylogowano poprawnie","Wylogowano");
  }
  reloadPage(): void {
    window.location.reload();
  }
  
}
