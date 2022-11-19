import { LembreteServiceService } from './../lembrete.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LembreteModel } from '../lembrete.model';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lembrete-update',
  templateUrl: './lembrete-update.component.html',
  styleUrls: ['./lembrete-update.component.css']
})
export class LembreteUpdateComponent implements OnInit {

  id_cat: String = '';

  lembrete: LembreteModel = {
    id: '',
    titulo: '',
    autor: '',
    descricao: '',
    data: '',
    status: '',
  }

  /* Validadores */
  titulo = new FormControl("", [Validators.minLength(3)]);
  autor = new FormControl("", [Validators.minLength(3)]);
  descricao = new FormControl("", [Validators.minLength(10)]);
  status = new FormControl("", [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LembreteServiceService

  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.lembrete.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.lembrete.id!).subscribe((res) => {
      this.lembrete = res;
    });
  }

  update(): void {
    this.service.update(this.lembrete).subscribe((res) => {
      this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
      this.service.message('Lembrete atualizado com sucesso!');
    }, err => {
      if (err.error.status == 400) {
        this.service.message(err.error.errors[0].defaultMessage);
      } else {
        this.service.message(err.error.error);
      }
    });
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
  }

  getTitulo() {
    if (this.titulo.invalid) {
      return "O campo Título deve conter entre 3 e 100 caracteres";
    }
    return false;
  }

  getDescricao() {
    if (this.descricao.invalid) {
      return "O campo Descrição deve conter entre 10 e 200 caracteres";
    }
    return false;
  }

  getAutor() {
    if (this.autor.invalid) {
      return "O campo Autor deve conter entre 3 e 100 caracteres";
    }
    return false;
  }

  getStatus() {
    if (this.status.invalid) {
      return "O campo Status deve ser selecionado";
    }
    return false;
  }

}
