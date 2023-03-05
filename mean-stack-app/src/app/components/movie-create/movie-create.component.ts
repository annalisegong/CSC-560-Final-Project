import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  submitted = false;
  movieForm: FormGroup;
  MovieProfile: any = ['Watched', 'In Progress', 'To Watch'];
  constructor(
    public fb: FormBuilder,
    private router: Router, 
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.movieForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }
  // Choose designation with select dropdown
  updateProfile(e) {
    this.movieForm.get('designation').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.movieForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.movieForm.valid) {
      return false;
    } else {
      return this.apiService.createMovie(this.movieForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}
