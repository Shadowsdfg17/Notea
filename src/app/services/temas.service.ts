import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Storage } from '@ionic/storage';
import { validateEventsArray } from 'angularfire2/firestore';

const M_SELECT='ModeSelect';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  renderer2: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document, private saveMode: Storage) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }

  //GUARDAR EL TEMA SELECCIONADO AL CERRA LA APP

  modeSelected(){
    this.saveMode.get(M_SELECT).then(value=>{
      if(value){
        this.renderer2.addClass(this.document.body, value);
      }else{
        this.renderer2.removeClass(this.document.body,'lightModeTheme');
        this.renderer2.removeClass(this.document.body,'darkModeTheme');
        this.renderer2.removeClass(this.document.body,'rainbowModeTheme');
      }
    })
  }


  //ACTIVAR Y DESACTIVAR LOS TEMAS PARA SU CORRECTO USO

  //MODO OSCURO (DARK MODE)
  enableDarkMode() {
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
    this.renderer2.addClass(this.document.body, 'darkModeTheme');
    this.saveMode.set(M_SELECT,'darkModeTheme');
  }
  
  //MODO CLARO (LIGHT MODE)
  enableLightMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
    this.renderer2.addClass(this.document.body, 'lightModeTheme');
    this.saveMode.set(M_SELECT,'lightModeTheme');
  }

  //MODO POR DEFECTO (DEFAULT MODE)
  enableDefaultMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
    this.saveMode.set(M_SELECT,null);
  }

  //MODO RAINBOW (RAINBOW MODE)
  enableRainbowMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.addClass(this.document.body, 'rainbowModeTheme');
    this.saveMode.set(M_SELECT,'rainbowModeTheme');
  }
}
