import { Component, OnInit } from '@angular/core';
import { Poste } from 'src/app/Model/poste';
import { PosteServiceService } from 'src/app/Service/poste-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  poste: Poste[];
  searchTerm: string;
  id : number;
  constructor(
    private posteServiceService: PosteServiceService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.loadPostes();

  }

  loadPostes() {
    this.posteServiceService.findAll().subscribe(data => {
      this.poste = data;
    });
  }

  deletePoste(id: number) {
    this.posteServiceService.deletePoste(id).subscribe(
      (response) => {
        console.log('Post deleted successfully:', response);
        this.loadPostes();
        this.toastr.success('Post deleted successfully', 'Success');
      },
      (error) => {
        console.error('Error deleting poste:', error);
        this.toastr.error('Failed to delete post', 'Error');
      }
    );
  }

  updateSelectedPost(poste: Poste) {
    // Stocker le poste sélectionné dans le service ou le stockage local pour y accéder dans le composant de mise à jour
    this.posteServiceService.setSelectedPost(poste);
    // Naviguer vers le composant de mise à jour avec l'ID du poste en tant que paramètre
    this.router.navigate(['/update-poste', poste.idPoste]);
  }

  addPoste(poste: Poste) {
    this.posteServiceService.save(poste).subscribe(
      () => {
        console.log('Post added successfully');
        this.loadPostes();
      },
      (error) => {
        console.error('Error adding poste:', error);
        this.toastr.error('Failed to add post', 'Error');
      }
    );
  }
  
  searchByTitle() {
    if (this.searchTerm) {
      this.posteServiceService.searchByTitle(this.searchTerm).subscribe(
        (data) => {
          this.poste = data;
        },
        (error) => {
          console.error('Error searching by title:', error);
        }
      );
    } else {
      this.loadPostes();
    }
  }
}
