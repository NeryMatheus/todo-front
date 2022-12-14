import { LembreteReadAllComponent } from './components/views/lembrete/lembrete-read-all/lembrete-read-all.component';
import { LembreteReadComponent } from './components/views/lembrete/lembrete-read/lembrete-read.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriaCreateComponent } from './components/views/categoria/categoria-create/categoria-create.component';
import { CategoriaDeleteComponent } from './components/views/categoria/categoria-delete/categoria-delete.component';
import { CategoriaReadComponent } from './components/views/categoria/categoria-read/categoria-read.component';
import { CategoriaUpdateComponent } from './components/views/categoria/categoria-update/categoria-update.component';
import { HomeComponent } from './components/views/home/home.component';
import { LembreteUpdateComponent } from './components/views/lembrete/lembrete-update/lembrete-update.component';
import { LembreteCreateComponent } from './components/views/lembrete/lembrete-create/lembrete-create.component';
import { LembreteDeleteComponent } from './components/views/lembrete/lembrete-delete/lembrete-delete.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'categorias',
    component: CategoriaReadComponent,
  },
  {
    path: 'categorias/create',
    component: CategoriaCreateComponent,
  },
  {
    path: 'categorias/update/:id',
    component: CategoriaUpdateComponent,
  },
  {
    path: 'categorias/delete/:id',
    component: CategoriaDeleteComponent,
  },
  {
    path: 'categorias/:id/lembretes',
    component: LembreteReadAllComponent,
  },
  {
    path: 'categorias/:id_cat/lembretes/:id/read',
    component: LembreteReadComponent,
  },
  {
    path: 'categorias/:id_cat/lembretes/create',
    component: LembreteCreateComponent,
  },
  {
    path: 'categorias/:id_cat/lembretes/:id/update',
    component: LembreteUpdateComponent,
  },
  {
    path: 'categorias/:id_cat/lembretes/:id/delete',
    component: LembreteDeleteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
