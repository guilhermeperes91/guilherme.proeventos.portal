//UTILIZANDO FERRAMENTA EMMENT PARA CRIAÇÃO DE COMPONENTES DE FORMULARIO
// ELEMENTO.ELEMENTO.CLASSEOBJETO
//EX: btn.btn.btn-outline-sucess
//Criação de tabela > = componentes da tabela)
//table.table.table-striped>thead.thead-dark>tr>th*8

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({ //referencias do html e css da classe
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [];
  public eventosFilter: any = [];
  widthImg: number = 150; //proptherth binding da classe com o html, formatando a img
  marginImg: number = 2;
  imgOnOff = true;
  private _filterList: string = '';

  public get filterList(): string {
    return this._filterList;
  }

  public set filterList(value: string){
    this._filterList = value;
    this.eventosFilter = this.filterList ? this.filterEvents (this.filterList) : this.eventos; //SE TIVER VALOR NO FILTER LIST, CHAMA O METODO FILTRAR EVENTOS E SERÁ RECEBIDO PELO EVENTOS FILTRADOS
  }

  filterEvents (filterBy: string): any{ //FILTRANDO POR TEMA E/OU EVENTO
    filterBy = filterBy.toLocaleLowerCase(); //converte pra caixa baixa e filtra tudo
    return this.eventos.filter( //filter do js
      (evento: { tema: string; local: string; }) =>
      evento.tema.toLocaleLowerCase().indexOf(filterBy)!== -1 || // || = OU
      evento.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getEventos(); //chamando o metodo geteventos dentro do noinit
  }

  alterImgState(){
    this.imgOnOff = ! this.imgOnOff;
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(   //requisitando o protocolo http na url passada e inscrever-se nela
      response => {
        this.eventos = response;
        this.eventosFilter = this.eventos; //CARGA NOS EVENTOS E EVENTOS FILTRADOS
      },
      error =>console.log(error)
      );
  }

}
