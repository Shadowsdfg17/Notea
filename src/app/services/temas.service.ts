import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemasService {

  renderer2: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer2 = this.rendererFactory.createRenderer(null, null);
  }


  //ACTIVAR DE DESACTIVAR LOS TEMAS PARA SU CORRECTO USO

  enableDarkMode() {
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
    this.renderer2.addClass(this.document.body, 'darkModeTheme');
  }

  enableLightMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
    this.renderer2.addClass(this.document.body, 'lightModeTheme');
  }

  enableDefaultMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.removeClass(this.document.body, 'rainbowModeTheme');
  }

  enableRainbowMode() {
    this.renderer2.removeClass(this.document.body, 'darkModeTheme');
    this.renderer2.removeClass(this.document.body, 'lightModeTheme');
    this.renderer2.addClass(this.document.body, 'rainbowModeTheme');
  }
}
