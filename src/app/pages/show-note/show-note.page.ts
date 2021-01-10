import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { TextspeakService } from 'src/app/services/textspeak.service';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.page.html',
  styleUrls: ['./show-note.page.scss'],
})
export class ShowNotePage implements OnInit {

  nota:Nota;
  textS:String;

  constructor(private backNote:ModalController, private textSpeak:TextspeakService) { }

  ngOnInit() {
  }

  closeNote(){
    this.backNote.dismiss();
  }

  //TTS DE LA NOTA

  tts(){
    this.textS = this.nota.texto
    this.textSpeak.talk(this.textS);
  }

}
