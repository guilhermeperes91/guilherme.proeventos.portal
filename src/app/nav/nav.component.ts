import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = true; //colepsed é o menu lateral quando diminui a tela pra responsividade, true para iniciar fechado
  constructor() { }

  ngOnInit() {
  }

}
