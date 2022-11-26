import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { LembreteServiceService } from './../lembrete.service.service';
import { LembreteModel } from './../lembrete.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lembrete-read-all',
  templateUrl: './lembrete-read-all.component.html',
  styleUrls: ['./lembrete-read-all.component.css'],
})
export class LembreteReadAllComponent implements OnInit {
  lembretes: LembreteModel[] = [];
  displayedColumns: string[] = ['id', 'titulo', 'status', 'action'];
  id_cat: String = '';

  dataSource!: MatTableDataSource<LembreteModel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

        this.dataSource = new MatTableDataSource(this.lembretes);
        this.dataSource.paginator = this.paginator;
      });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
