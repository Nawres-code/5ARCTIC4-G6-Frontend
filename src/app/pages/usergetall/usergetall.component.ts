import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Service/auth.service';
import { DashboardService } from 'src/app/Service/dashboard.service';
import { GestionuserService } from 'src/app/Service/gestionuser.service';

@Component({
  selector: 'app-usergetall',
  templateUrl: './usergetall.component.html',
  styleUrls: ['./usergetall.component.scss']
})
export class UsergetallComponent implements OnInit {
  users: any[] = [];
  paginatedUsers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust items per page as needed
  totalPages: number;
  pages: number[] = [];

  constructor(private GestionuserService: GestionuserService, private authSerivce: AuthService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.GestionuserService.findAll().subscribe((data: any[]) => {
      this.users = data;
      this.totalPages = Math.ceil(this.users.length / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.setPage(this.currentPage);
    });
  }

  deleteUser(id: number) {
    this.authSerivce.deleteUserById(id).subscribe(() => {
      this.toastr.success('User Deleted successfully!', 'Success');
      this.loadUsers(); // Reload users after deletion
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.users.length);
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }
}
