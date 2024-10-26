import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeService } from 'src/app/Service/JwtDecodeService';
import { ReclamationUserAdmin } from 'src/app/Service/ReclamationUserAdmin';

@Component({
  selector: 'app-reclam-admin',
  templateUrl: './reclam-admin.component.html',
  styleUrls: ['./reclam-admin.component.scss']
})
export class ReclamAdminComponent implements OnInit {
  reclamations: any[];
  paginatedReclamations: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number;
  pages: number[] = [];
  searchText: string = '';

  constructor(private reclamationService: ReclamationUserAdmin, private jwtDecodeService: JwtDecodeService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getall();
  }

  getall() {
    this.reclamationService.findAll().subscribe(
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

  acceptReclamation(email: string, value: string) {
    if (value == "Pending") {
      this.reclamationService.Treat(email).subscribe(() => {
        this.getall();
        this.toastr.success('reclamation Treated successfully', 'Success');
      })
    } else {
      return;
    }
  }

  rejectReclamation(email: string, value: string) {
    if (value == "Pending") {
      this.reclamationService.Reject(email).subscribe(() => {
        this.getall();
        this.toastr.success('reclamation Rejected successfully', 'Success');
      })
    } else {
      return;
    }
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
      reclamation.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      reclamation.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
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
