import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css'],
})
export class CategoriaCreateComponent implements OnInit {
  categoria: Categoria = {
    nome: "",
    desc: "",
  };

  constructor(private service: CategoriaService, private router: Router) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.categoria).subscribe(
      (resposta) => {
        this.router.navigate(['categorias'])
        this.service.message('Categoria criada com sucesso!');
      },
      (err) => {
        this.service.message('Erro ao criar categoria! Preencha todos os campos!!');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
