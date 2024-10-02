import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { UserService } from '../../service/user.service'; // Import your UserService
import { PostService } from '../../service/post.service'; // Import PostService if needed

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, SidenavComponent],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  showProfile: boolean = false; 
  users: any[] = []; // Array to hold user data

  constructor(private userService: UserService,private postService: PostService) {}

  ngOnInit() {
    this.loadUsers(); // Call the function to load users
  }

  loadUsers() {
    this.postService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data; // Assign the fetched data to the users array
        console.log("Users loaded:", this.users);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }
}
