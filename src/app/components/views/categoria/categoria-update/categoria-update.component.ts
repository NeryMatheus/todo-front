import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css'],
})
export class CategoriaUpdateComponent implements OnInit {
  categoria: Categoria = {
    id: '',
    nome: '',
    desc: '',
  };

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
        this.categoria.nome = response.nome,
        this.categoria.desc = response.desc;
      });
  }

  update(): void {
    this.service.update(this.categoria).subscribe(
      (res) => {
        this.router.navigate(['categorias']);
        this.service.message('Categoria atualizada com sucesso!!');
      },
      (err) => {
        this.service.message('Erro ao atualizar a categoria!!');
      }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
