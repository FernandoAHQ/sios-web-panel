import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  categories = [
    "existentes",
    "bitacora",
  ]

  constructor(
  ) { }

  ngOnInit(): void {
  }



}
