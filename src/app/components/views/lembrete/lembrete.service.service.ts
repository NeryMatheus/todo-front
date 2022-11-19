import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LembreteModel } from './lembrete.model';

@Injectable({
  providedIn: 'root',
})
export class LembreteServiceService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String): Observable<LembreteModel[]> {
    const url = `${this.baseUrl}lembretes?categoria=${id_cat}`;
    return this.http.get<LembreteModel[]>(url);
  }

  findById(id: String): Observable<LembreteModel> {
    const url = `${this.baseUrl}lembretes/${id}`;
    return this.http.get<LembreteModel>(url);
  }

  update(lembrete: LembreteModel): Observable<LembreteModel> {
    const url = `${this.baseUrl}lembretes/${lembrete.id}`;
    return this.http.put<LembreteModel>(url, lembrete);
  }

  message(msg: string): void {
    this._snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
