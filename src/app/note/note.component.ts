import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note} from '../shared/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() note: Note;
  @Input() isActive = false;
  // @Output() changes = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  // handler(eventType) {
  //   switch (eventType) {
  //     case CRUD.UPDATE:
  //       this.changes.emit(CRUD.UPDATE);
  //       break;
  //     case CRUD.DELETE:
  //       this.changes.emit(CRUD.DELETE);
  //       break;
  //   }
  // }
}
