import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router) {}

    public async logout(){
      await this.authS.logout();
      if(!this.authS.isLogged()){
        this.router.navigate(['/login'])
      }
    }

}
