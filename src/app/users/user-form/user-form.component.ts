import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  user: any = { name: '', email: '', password: '' };
  isEdit = false;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.userService.getUsers().subscribe((users: any[]) => {this.user = users.find(u => u._id === this.id);
      });
    }
  }

  saveUser() {
    if (this.isEdit) {
      this.userService.updateUser(this.id!, this.user).subscribe(() => {
        this.navigateTo()
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.navigateTo()
      });
    }
  }

  navigateTo(){
    if(this.auth.getToken()){
      this.router.navigate(['/users']);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
