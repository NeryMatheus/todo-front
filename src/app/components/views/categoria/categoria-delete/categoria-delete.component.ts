import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css'],
})
export class CategoriaDeleteComponent implements OnInit {
  categoria: Categoria = {
    id: '',
    nome: '',
    desc: '',
  };

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
      (this.categoria.nome = response.nome),
        (this.categoria.desc = response.desc);
    });
  }

  delete(): void {
    this.service.delete(this.categoria.id!).subscribe(
      (res) => {
        this.router.navigate(['categorias']);
        this.service.message('Categoria excluída com sucesso!!');
      },
      (err) => {
        this.service.message(err.error.error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }
}
