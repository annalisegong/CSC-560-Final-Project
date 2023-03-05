import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieCreateComponent } from './components/movie-create/movie-create.component';
import { MovieEditComponent } from './components/movie-edit/movie-edit.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'create-movie'},
  {path: 'create-movie', component: MovieCreateComponent},
  {path: 'edit-movie', component: MovieEditComponent},
  {path: 'movies-list', component: MovieListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
