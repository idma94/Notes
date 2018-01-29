import {Component, ViewChild} from '@angular/core';
import {NoteListComponent} from './note-list/note-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild(NoteListComponent) noteList;

  directoryChanged(id) {
    this.noteList.directoryId = id;
    this.noteList.init();
    this.noteList.focusNote = null;
  }
}
