import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ShowNotePage } from '../pages/show-note/show-note.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  public listaNotas = [];
  public listaNotasCopy = [];
  

  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    private alertMessage: AlertController) {}

  ngOnInit(){
    this.cargaDatos();
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }

  ionViewDidEnter() {
    this.notasS.loadMyCollection();
    this.cargaDatos();
    
  }
  public cargaDatos($event=null){
    try {
      this.notasS.leeNotas()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
          this.listaNotas=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
            this.listaNotas.push(nota);
            this.listaNotasCopy= this.listaNotas;
          });
          //Ocultar el loading
          console.log(this.listaNotas);
          if($event){
            $event.target.complete();
          }
        })
    } catch (err) {
      //Error
    }
  }
  public borraNota(id:any){
    this.notasS.borraNota(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaNotas.forEach((nota)=>{     
        if(nota.id!=id){
         tmp.push(nota);
        }
      })
      this.listaNotas=tmp;
      this.listaNotasCopy = this.listaNotas;
    })
    .catch(err=>{

    })
  }
  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    return await modal.present();
  }

  public async verNota(nota:Nota){
    const modal = await this.modalController.create({
      component: ShowNotePage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    return await modal.present();
  }


  public buscaNota(evt:any) {
    const val = evt.target.value;
    this.listaNotasCopy = this.listaNotas;
    if(val && val.trim()!= ''){
      this.listaNotasCopy = this.listaNotasCopy.filter((data)=>{
        return (data.titulo.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async messageAlertConfirm(id:any){
    const alert = await this.alertMessage.create({
      cssClass: '',
      header: 'Eliminar',
      message: '¿Desea eliminar la nota?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Si',
          handler: () => {
            this.borraNota(id)
          }
        }
      ]
    });
   await alert.present();
}

}
