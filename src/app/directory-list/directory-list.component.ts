import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ServerService} from '../shared/server.service';
import {Directory} from '../shared/directory';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.component.html',
  styleUrls: ['./directory-list.component.css']
})
export class DirectoryListComponent implements OnInit {
  form: FormGroup;
  directories: Directory[];
  @Input() directory;
  @Output() directoryChange = new EventEmitter();
  @ViewChild(ModalComponent) modal;

  constructor(private server: ServerService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ])]
    });
  }

  ngOnInit() {
    this.getDirectory();
  }

  getDirectory() {
    this.server.getDirectories().subscribe(data => {
      this.directories = data;
    });
  }

  addDirectory(data: Directory) {
    this.server.addDirectory(data).subscribe(() => {
      this.form.reset();
      this.modal.closeModal();
      this.getDirectory();
    });
  }

  deleteDirectory(id) {
    this.server.deleteDirectory(id).subscribe(data => {
      console.log(data);
      this.getDirectory();
    });
  }

  selectDirectory(id) {
    this.directory = id;
    this.directoryChange.emit(id);
  }

  updateDirectory(data: Directory) {
    this.server.updateDirectory(data);
  }
}
