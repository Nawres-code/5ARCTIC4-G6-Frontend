import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/Model/Reclamation';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';

@Component({
  selector: 'app-reclam-userlist',
  templateUrl: './reclam-userlist.component.html',
  styleUrls: ['./reclam-userlist.component.scss']
})
export class ReclamUserlistComponent implements OnInit {
  reclamations: any[];
  paginatedReclamations: any[];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Adjust items per page as needed
  totalPages: number;
  pages: number[] = [];
  searchText: string = '';
  decodedToken: any;

  constructor(private reclamationService: ReclamationUserAdmin, private jwtDecodeService: JwtDecodeService, private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      this.decodedToken = this.jwtDecodeService.decodeToken();
      console.log('Decoded token:', this.decodedToken);
    } else {
      console.log('Token not found in local storage');
    }

    this.reclamationService.findByEmail(this.decodedToken.sub).subscribe(
      (data: any) => {
        this.reclamations = data;
        this.totalPages = Math.ceil(this.reclamations.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.setPage(this.currentPage);
      },
      (error) => {
        console.error('Error fetching reclamation list:', error);
      }
    );
  }

  navigateToAddReclamation() {
    this.router.navigateByUrl('/reclamationUser');
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.reclamations.length);
    this.paginatedReclamations = this.reclamations.slice(startIndex, endIndex).filter(reclamation =>
      reclamation.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      reclamation.content.toLowerCase().includes(this.searchText.toLowerCase()) ||
      reclamation.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
      reclamation.status.toLowerCase().includes(this.searchText.toLowerCase())
    );
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

  search() {
    this.currentPage = 1;
    this.setPage(1);
  }
}
