import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { usuario } from '../model/usuario';
import { AuthService } from '../services/auth.service';
import { LanguageService } from '../services/language.service';
import { NotasService } from '../services/notas.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  usuario: usuario;

  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    private language:LanguageService,
   ) 
   {
    this.usuario = authS.getUser();
   }

    public async logout(){
      await this.authS.logout();
      if(!this.authS.isLogged()){
        this.router.navigate(['/login'])
      }
    }

    //CAMBIAR IDIOMA
  
    cLanguage($event){
      this.language.setLanguage($event.target.value);
      console.log($event.target.value);
    }

}
