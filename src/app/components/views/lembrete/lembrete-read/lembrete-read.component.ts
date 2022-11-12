import { LembreteServiceService } from './../lembrete.service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LembreteModel } from './../lembrete.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lembrete-read',
  templateUrl: './lembrete-read.component.html',
  styleUrls: ['./lembrete-read.component.css'],
})
export class LembreteReadComponent implements OnInit {
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
    private service: LembreteServiceService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
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

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/lembretes`]);
  }

  update(): void {
    this.router.navigate([`categorias/${this.id_cat}/lembretes/${this.lembrete.id}/update`]);
  }
}
