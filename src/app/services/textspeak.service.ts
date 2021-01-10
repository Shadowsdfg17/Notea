import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class TextspeakService {

  constructor(private textSpeak: TextToSpeech) { }

  talk(text){
    return this.textSpeak.speak({
      text: text,
      locale: 'es-ES',
      rate: 1
    })
    .then(() => console.log("Leido!!"))
    .catch((failed:any) => console.log(failed));
  }

}
