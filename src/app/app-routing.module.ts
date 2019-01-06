import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'movie/:id', component: MovieComponent },
    { path: 'movie/:id/search/:word', component: MovieComponent },
    { path: 'search', component: SearchComponent },
    { path: 'search/:word', component: SearchComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
