import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Directory} from './Directory';
import {Notes} from './Notes';

const url = environment.serverUrl;

@Injectable()
export class ServerService {

  constructor(private http: HttpClient) {
  }

  getNotes() {

  }

  createNote(id) {

  }

  updateNote(id) {

  }

  deleteNote(id) {

  }

  createDirectory() {
  }

  getDirectories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(url + 'directories');
  }
}
