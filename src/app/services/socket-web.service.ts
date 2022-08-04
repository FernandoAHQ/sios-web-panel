import { Injectable } from '@angular/core';
import io,{Socket} from 'socket.io-client'
import { AssignInterface } from '../interfaces/Interfaces';
import { GradeInterface } from '../interfaces/Interfaces';
import { ServiciosService } from './admin-role/servicios.service';
import Push from 'push.js'

//const url=  'https://sios-server-new.herokuapp.com';
  const url=  'http://10.1.41.40:4000';

@Injectable({
  providedIn: 'root'
})

export class SocketWebService{


  socket?: Socket
  public StatusSocket: boolean = false;

    constructor(private servicios: ServiciosService ) { 
      

    }

    connect(){

      const Token = localStorage.getItem('token')

      this.socket= io(url, {

        transports: ["websocket"],
        forceNew: true,
        query:{

          'accessToken': `Bearer ${Token}`

        }
      
      })
    }

    status(){

      console.log(this.socket!.connect())
      
  

    }

     escucharService(){

      this.socket?.on('services-all', (payload)=>{
        
        console.log("PASE POR AQUI ");
        this.servicios.leerServices(payload);
        console.log(payload);
      })

     }

     asignarServicio(assigned: AssignInterface){
      this.socket?.emit("assigned", assigned);
    }

    calificarServicio(grade: GradeInterface, service: String){
      this.socket?.emit("calificar-service", {
        from: localStorage.getItem("IdAdmin") || "",
        service: service,
        grade: grade
      });

      console.log("SENT TO SERVER: " + {
        to: '',
        from: '',
        grade: grade
      });
    }


    disconnect() {
      this.socket!.disconnect();
    }

   
    



}
