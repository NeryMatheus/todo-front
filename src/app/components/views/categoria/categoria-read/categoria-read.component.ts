import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css'],
})
export class CategoriaReadComponent implements OnInit {
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['id', 'nome', 'desc', 'lembrete', 'action'];

  dataSource!: MatTableDataSource<Categoria>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: CategoriaService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.categorias = resposta;

      this.dataSource = new MatTableDataSource(this.categorias);
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
