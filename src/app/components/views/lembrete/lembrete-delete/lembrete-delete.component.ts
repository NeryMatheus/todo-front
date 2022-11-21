import { Observable } from 'rxjs';
import { LembreteServiceService } from './../lembrete.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LembreteModel } from './../lembrete.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lembrete-delete',
  templateUrl: './lembrete-delete.component.html',
  styleUrls: ['./lembrete-delete.component.css'],
})
export class LembreteDeleteComponent implements OnInit {
  id_cat: String = '';

  lembrete: LembreteModel = {
    id: '',
    titulo: '',
    autor: '',
    descricao: '',
    data: '',
    status: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: LembreteServiceService
  ) {}

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
    this.lembrete.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.lembrete.id!).subscribe((resposta) => {
      this.lembrete = resposta;
    });
  }

  deletar(): void {
    this.service.delete(this.lembrete.id!).subscribe(
      (resposta) => {
        this.service.message('Lembrete deletado com sucesso!');
        this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
      }
    );
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
  }
}
