import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Note} from '../shared/note';
import {ServerService} from '../shared/server.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {
  page = 1;
  perPage = 8;
  total = 0;

  form: FormGroup;
  notes: Note[] = [];
  focusNote: Note;

  @Input() directoryId;
  @ViewChild('deleteModal') deleteModal: ModalComponent;
  @ViewChild('createModal') createModal: ModalComponent;
  @ViewChild('editModal') editModal: ModalComponent;

  get gridSize() {
    return this.perPage < 12 ? {width: '50%', 'max-height': '50%'} : {width: '33%', 'max-height': '25%'};
  }

  constructor(private server: ServerService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', this._formValidators()],
      description: ['', this._formValidators()],
    });
    this.init();
  }

  init() {
    this.server.directoryId = this.directoryId;
    this.fetchData();
  }

  fetchData() {
    if (!isNullOrUndefined(this.directoryId)) {
      this.server.getNotes({
        _page: this.page,
        _limit: this.perPage
      }).subscribe(data => {
        this.total = parseInt(data.headers.get('X-Total-Count'), 10);
        this.notes = data.body;
      });
    }
  }

  createNote(data) {
    this.server.createNote(data).subscribe(() => {
      this.createModal.closeModal();
      this.resetNoteList();
    });
  }

  editNote(data) {
    this.server.updateNote(this.focusNote.id, data).subscribe(() => {
      this.editModal.closeModal();
      this.resetNoteList();
    });
  }

  deleteNote() {
    this.server.deleteNote(this.focusNote.id).subscribe(() => {
      this.deleteModal.closeModal();
      this.resetNoteList();
    });
  }

  patchValue({title, description}) {
    this.form.patchValue({
      title: title,
      description: description,
    });
  }

  resetNoteList() {
    this.fetchData();
    this.focusNote = null;
    this.form.reset();
  }

  pageChanged(page) {
    this.page = page;
    this.fetchData();
  }

  _formValidators() {
    return Validators.compose([Validators.required, Validators.minLength(3)]);
  }
}
