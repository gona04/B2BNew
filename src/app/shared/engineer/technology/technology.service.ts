import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technology } from './technology.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  private BASE_URL: string = environment.apiUrl + "technology/";

  constructor(private http: HttpClient) { }

  addTechnoloy(technology: Technology) {
    return this.http.post(this.BASE_URL+'add', technology);
  }

  getAlltechnologies(eID: string) {
    return this.http.get(this.BASE_URL + 'get/'+ eID);
  }

  deleteTechnology(tId: string) {
    return this.http.delete(this.BASE_URL + 'delete/' + tId);
  }

  updateTechnology(tId: string, technology: Technology) {
    
    return this.http.put(this.BASE_URL + 'edit/' + tId , technology)
  }
}
