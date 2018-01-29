export class Note {
  id?: string;
  directory_id: number;
  title: string;
  description: string;
  date: number;
  constructor({id, directory_id, title, description, date}) {
    this.id = id;
    this.directory_id = directory_id;
    this.title = title;
    this.description = description;
    this.date = date;
  }
}
