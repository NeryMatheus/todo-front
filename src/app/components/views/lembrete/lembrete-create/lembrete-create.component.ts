import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LembreteModel } from './../lembrete.model';
import { LembreteServiceService } from './../lembrete.service.service';

@Component({
  selector: 'app-lembrete-create',
  templateUrl: './lembrete-create.component.html',
  styleUrls: ['./lembrete-create.component.css'],
})
export class LembreteCreateComponent implements OnInit {
  statusOption = ['CRIADO', 'EM ANDAMENTO', 'FINALIZADO'];

  id_cat: String = '';

  lembrete: LembreteModel = {
    id: '',
    titulo: '',
    autor: '',
    descricao: '',
    data: '',
    status: '',
  };

  titulo = new FormControl('', [Validators.minLength(3)]);
  autor = new FormControl('', [Validators.minLength(3)]);
  descricao = new FormControl('', [Validators.minLength(3)]);
  status = new FormControl('', [Validators.required]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LembreteServiceService
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    this.service.create(this.lembrete, this.id_cat).subscribe(
      (resposta) => {
        this.service.message('Lembrete criado com sucesso!');
        this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
      },
      (err) => {
        if (err.error.status == 400) {
          this.service.message(err.error.errors[0].defaultMessage);
        } else {
          this.service.message(err.error.error);
        }
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
  }

  /* Validadores */
  getTitulo() {
    if (this.titulo.invalid) {
      return 'O título deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }
  getAutor() {
    if (this.autor.invalid) {
      return 'O autor deve conter entre 3 e 100 caracteres.';
    }
    return false;
  }
  getDescricao() {
    if (this.descricao.invalid) {
      return 'A descrição deve conter entre 3 e 255 caracteres.';
    }
    return false;
  }
  getStatus() {
    if (this.status.invalid) {
      return 'O status deve ser informado.';
    }
    return false;
  }
}
