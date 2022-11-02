import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Categoria } from './categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) {}

  /* Exibir todas as categorias */
  findAll(): Observable<Categoria[]> {
    const url = `${this.baseUrl}categorias`;
    return this.http.get<Categoria[]>(url);
  }

  /* Criar nova categoria */
  create(categoria: Categoria): Observable<Categoria> {
    const url = `${this.baseUrl}categorias`;
    return this.http.post<Categoria>(url, categoria);
  }

  /* Exibir mensagens */
  message(msg: string): void {
    this._snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
