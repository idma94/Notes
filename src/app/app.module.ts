import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ServerService} from './shared/server.service';
import {DirectoryListComponent} from './directory-list/directory-list.component';
import {ModalComponent} from './modal/modal.component';
import {NoteListComponent} from './note-list/note-list.component';
import {NoteComponent} from './note/note.component';
import {PaginationComponent} from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    DirectoryListComponent,
    ModalComponent,
    NoteListComponent,
    NoteComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
