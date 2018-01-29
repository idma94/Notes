import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Directory} from './directory';
import {Note} from './note';

const url = environment.serverUrl;

@Injectable()
export class ServerService {
  private _directoryId: number;

  get directoryId(): number {
    return this._directoryId;
  }

  set directoryId(value: number) {
    this._directoryId = value;
  }

  static generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  constructor(private http: HttpClient) {
  }

  getNotes(options): Observable<any> {
    const params = Object.assign(options, {
      'directory_id': this.directoryId
    });
    return this.http.get(url + 'notes', {
      observe: 'response',
      params: params
    });
  }

  createNote({title, description}): Observable<any> {
    const body = new Note({
      id: ServerService.generateId(),
      directory_id: this.directoryId,
      title: title,
      description: description,
      date: new Date().getTime()
    });

    return this.http.post(url + 'notes', body);
  }

  updateNote(id, {title, description}): Observable<any> {
    const body = new Note({
      id: id,
      directory_id: this.directoryId,
      title: title,
      description: description,
      date: new Date().getTime()
    });
    return this.http.put(`${url}notes/${body.id}`, body);
  }

  deleteNote(id) {
    return this.http.delete(url + 'notes' + '/' + id);
  }

  getDirectories(): Observable<Directory[]> {
    return this.http.get<Directory[]>(url + 'directories');
  }

  addDirectory(data: Directory): Observable<any> {
    data.id = ServerService.generateId();
    return this.http.post(url + 'directories', data);
  }

  deleteDirectory(id): Observable<any> {
    return this.http.delete(url + 'directories' + '/' + id);
  }

  updateDirectory(body: Directory): Observable<any> {
    return this.http.put(url + 'directories', body);
  }
}
