import { Component, EventEmitter, Input, Output } from '@angular/core';



@Component({
  selector: 'shared-paginator',
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {

  @Input()
  paginaActual : number = 0;

  @Input()
  totalPaginas : number = 0;

  @Output()
  changePage = new EventEmitter<number>;

  nextPage(){
    if(this.paginaActual<this.totalPaginas){
      this.paginaActual+=1;
    }
    else{
      this.paginaActual = 1;
    }
    this.changePage.emit(this.paginaActual);
  }

  lastPage(){
    if(this.paginaActual > 1 && this.paginaActual<=this.totalPaginas){
      this.paginaActual-=1;
    }
    else{
      this.paginaActual = 1;
    }
    this.changePage.emit(this.paginaActual);
  }

  firstPage(){
    this.paginaActual = 1;
    this.changePage.emit(this.paginaActual);
  }

  finalPage(){
    this.paginaActual = this.totalPaginas;
    this.changePage.emit(this.paginaActual);
  }

}
