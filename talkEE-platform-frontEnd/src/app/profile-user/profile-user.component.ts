import { Component, OnInit } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, SidenavComponent],
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.scss']
})
export class ProfileUserComponent implements OnInit {
  profile: string = 'assets/icons/home/profile.svg';
  showReactions: boolean = false;
  toggleToComment: { [key: string]: boolean } = {}; 
  commentExist: boolean = false;
  userPosts: any[] = []; 
  currentUserId: string | null = null; 
  currentUser:string| null= "" ;
  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.currentUserId = this.userService.getUserId();
    console.log("this.currentUserId->",this.currentUserId)
    this.loadUserPosts();
    this.currentUser= this.userService.getUsername();
  }

  loadUserPosts() {
    if (this.currentUserId) {
        this.postService.getUserPosts(this.currentUserId).subscribe(
            (data) => {
                this.userPosts = data;
                console.log("User posts loaded:", this.userPosts);
            },
            (error) => {
                console.error('Error fetching user posts:', error);
            }
        );
    } else {
        console.error('No current user ID found. Cannot load user posts.');
    }
}

  addComment(postId: string, commentContent: string) {
    if (commentContent.trim()) {
        const commentData = { content: commentContent };
        this.postService.addComment(postId, commentData).subscribe(
            (response) => {
                console.log("Comment added:", response);
                this.loadUserPosts(); 
            },
            (error) => {
                console.error('Error adding comment:', error);
            }
        );
    }
}

toggleComment(postId: string) {
  this.toggleToComment[postId] = !this.toggleToComment[postId]; // Toggle for specific post
}
}
