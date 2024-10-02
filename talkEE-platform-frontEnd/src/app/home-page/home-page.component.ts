import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, SidenavComponent, CommonModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  posts: any[] = [];
  newPostContent: string = '';
  newPostTitle: string = '';
  profile: string = 'assets/icons/home/profile.svg';
  showProfile: boolean = false;
  showReactions: boolean = false;
  toggleToComment: { [key: string]: boolean } = {};
  commentExist: boolean = false;
  isAdmin: boolean = false; 
  currentUserId: string | null = null; 
  currentPostId: string | null = null; 
  isEditing: boolean = false; 


  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit() {
    this.loadPosts();
    this.isAdmin = this.userService.isAdmin();
    this.currentUserId = this.userService.getUsername();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe(
      (data) => {
        this.posts = data;
        console.log("Posts loaded:", this.posts);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
  addComment(postId: string, commentContent: string) {
    if (commentContent.trim()) {
      this.postService.addComment(postId, { content: commentContent }).subscribe(
        (updatedPost) => {
          const index = this.posts.findIndex(post => post._id === postId);
          if (index !== -1) {
            this.posts[index] = updatedPost; // Update the post with the new comment
          }
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
  createPost() {
    if (this.newPostContent.trim() && this.newPostTitle.trim()) {
      const postData = {
        content: this.newPostContent,
        title: this.newPostTitle
      };
      this.postService.createPost(postData).subscribe(
        (data) => {
          this.posts.unshift(data);
          this.newPostContent = '';
          this.newPostTitle = '';
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }

  toggleComment(postId: string) {
    this.toggleToComment[postId] = !this.toggleToComment[postId]; 
  }
  editPost(post: any) {
    // Store the ID of the post being edited
    this.currentPostId = post._id;
    this.newPostContent = post.content;
    this.newPostTitle = post.title;
  }
  
  // Save the edited post
  saveEditedPost() {
    if (this.newPostContent.trim() && this.newPostTitle.trim() && this.currentPostId) {
      const updatedPostData = {
        content: this.newPostContent,
        title: this.newPostTitle
      };
      this.postService.updatePost(this.currentPostId, updatedPostData).subscribe(
        (data) => {
          const index = this.posts.findIndex(post => post._id === this.currentPostId);
          if (index !== -1) {
            this.posts[index] = data; // Replace with updated post
          }
          this.resetForm(); // Reset form fields after updating
        },
        (error) => {
          console.error('Error updating post:', error);
        }
      );
    }
  }
  resetForm() {
    this.newPostContent = '';
    this.newPostTitle = '';
    this.currentPostId = null;
    this.isEditing = false; // Reset editing flag
  }  
  createOrUpdatePost() {
    if (this.isEditing) {
      this.saveEditedPost();
    } else {
      this.createPost();
    }
  }
  deletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(postId).subscribe(
        () => {
          this.posts = this.posts.filter(post => post._id !== postId);
          console.log('Post deleted successfully');
        },
        (error) => {
          console.error('Error deleting post:', error);
        }
      );
    }
  }
}
