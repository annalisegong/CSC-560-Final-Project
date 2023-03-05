import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  movieData: Movie[];
  MovieProfile: any = ['Watched', 'In Progress', 'To Watch'];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateMovie();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getMovie(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['',[Validators.required]]
    });
  }
  // Choose options with select-dropdown
  updateProfile(e) {
    this.editForm.get('status').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getMovie(id) {
    this.apiService.getMovie(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        description: data['description'],
        status: data['status']
      });
    });
  }
  updateMovie() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateMovie(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/movies-list');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}
