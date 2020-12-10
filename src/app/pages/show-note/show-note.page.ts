import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.page.html',
  styleUrls: ['./show-note.page.scss'],
})
export class ShowNotePage implements OnInit {

  nota:Nota;

  constructor(private backNote:ModalController) { }

  ngOnInit() {
  }

  closeNote(){
    this.backNote.dismiss();
  }

}
