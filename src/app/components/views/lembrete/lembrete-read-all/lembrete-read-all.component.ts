import { ActivatedRoute, Router } from '@angular/router';
import { LembreteServiceService } from './../lembrete.service.service';
import { LembreteModel } from './../lembrete.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lembrete-read-all',
  templateUrl: './lembrete-read-all.component.html',
  styleUrls: ['./lembrete-read-all.component.css'],
})
export class LembreteReadAllComponent implements OnInit {
  lembretes: LembreteModel[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'status', 'action'];
  id_cat: String = '';

  constructor(
    private lembreteServiceService: LembreteServiceService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.id_cat = params['id']);
    this.findAll();
  }

  findAll(): void {
    this.lembreteServiceService
      .findAllByCategoria(this.id_cat)
      .subscribe((resposta) => {
        this.lembretes = resposta;
      });
  }
}
