import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Department, RespDepartment } from 'src/app/interfaces/InterfaceAllDepartment';
import { ServicesByStatusService } from '../../../../../services/services-by-status.service';
import { Router } from '@angular/router';
import { Computer } from 'src/app/interfaces/RespApi';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Status {
  value: string;
}
interface System {
  value: string;
}

@Component({
  selector: 'app-modificar-computadoras',
  templateUrl: './modificar-computadoras.component.html',
  styleUrls: ['./modificar-computadoras.component.css']
})
export class ModificarComputadorasComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private Router:Router,
    private ServicesByStatusService:ServicesByStatusService,
    public dialogRef: MatDialogRef<ModificarComputadorasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Computer
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

  RegisForm: FormGroup;
  Deparments!: Department[];

  DeparmentSelected: string  = "";
  StatusSelected:    string  = "";
  SystemSelected:    string  = "";


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

  ngOnInit(): void {
    this.getDepartments()
    this.DeparmentSelected=this.data._id
    this.StatusSelected=this.data.status
  }

  getDepartments(){

    this.ServicesByStatusService.Get_Departments().subscribe(
      resp=>{
        this.Deparments = resp.departments;
        console.log(this.Deparments);
      }
    )

  }


  actualizarPC(){

    const deparment = this.RegisForm.value.Departamento
    const folio = this.RegisForm.value.Folio
    const status = this.RegisForm.value.Status
    const processor = this.RegisForm.value.Processor
    const storage = this.RegisForm.value.Storage
    const ram = this.RegisForm.value.RAM
    const so = this.RegisForm.value.System
    const id= this.data._id

    this.ServicesByStatusService.ActualizarPC(id,deparment, folio, status, processor, storage, ram, so).subscribe(




    )


    location.reload();

  }


  MensajeUsuarioOk(MSG : string){

    const mensaje = "Se actualizó la computadora "+ `${MSG}` + " !!!"

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
