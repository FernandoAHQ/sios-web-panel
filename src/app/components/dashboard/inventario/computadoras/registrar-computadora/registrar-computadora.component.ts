import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department, RespDepartment } from 'src/app/interfaces/InterfaceAllDepartment';
import { ServicesByStatusService } from '../../../../../services/services-by-status.service';
import { Router } from '@angular/router';

interface Status {
  value: string;
}
interface System {
  value: string;
}

@Component({
  selector: 'app-registrar-computadora',
  templateUrl: './registrar-computadora.component.html',
  styleUrls: ['./registrar-computadora.component.css']
})
export class RegistrarComputadoraComponent implements OnInit {

  RegisForm: FormGroup;
  Deparments!: Department[];

  StatusAll: Status[] = [
    {value: 'Activo'},
    {value: 'Inactivo'},
    {value: 'Mantenimiento'},
  ];

  SystemsAll: System[] = [
    {value: 'Windows 10 x64'},
    {value: 'Windows 10 x32'},
    {value: 'Windows 8.1 x64'},
    {value: 'Windows 8.1 x32'},
    {value: 'Windows 8 x64'},
    {value: 'Windows 8 x32'},
    {value: 'Windows 7 x64'},
    {value: 'Windows 7 x32'},
  ];

  DeparmentSelected: string  = "";
  StatusSelected:    string  = "";
  SystemSelected:    string  = "";

  constructor(
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private Router:Router,
    private ServicesByStatusService: ServicesByStatusService,

  ) {
    this.RegisForm =  this.fb.group({
      Departamento: ['',Validators.required],
      Folio: ['',Validators.required],
      Status:['',Validators.required],
      Processor:['',Validators.required],
      Storage:['',Validators.required],
      Ram:['',Validators.required],
      System:['',Validators.required],

    })
  }



  ngOnInit(): void {
    this.getDepartments()
  }


  getDepartments(){

    this.ServicesByStatusService.Get_Departments().subscribe(
      resp=>{
        this.Deparments = resp.departments;
        console.log(this.Deparments);
      }
    )

  }

  registrarPC(){

    const deparment = this.RegisForm.value.Departamento
    const folio = this.RegisForm.value.Folio
    const status = this.RegisForm.value.Status
    const processor = this.RegisForm.value.Processor
    const storage = this.RegisForm.value.Storage
    const ram = this.RegisForm.value.RAM
    const so = this.RegisForm.value.System


    this.ServicesByStatusService.PostRegistrarPC(deparment, folio, status, processor, storage, ram, so).subscribe(
      resp=>{
        if(resp.status){
          this.MensajeUsuarioOk(folio)
        }
        else{

          this.error("VERIFICA LOS CAMPOS O CONTACTA AL ADMIN")

        }
      }
    )
  }


  MensajeUsuarioOk(MSG : string){

    const mensaje = "Se cre?? correctamente la computadora "+ `${MSG}` + " !!!"

    this._snackBar.open(mensaje,'',{

      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    })

    location.reload();
  }

  error(mensaje : string){

    this._snackBar.open(mensaje,'',{

      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    })

  }

}
