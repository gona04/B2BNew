import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Engineer } from './engineer.model';
// import { Technology } from '../technology/technology.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class EngineerService {
private BASE_URL:string = environment.apiUrl + "engineer/"
  constructor(private http: HttpClient) { }

  getAllEngineers(){
    return this.http.get(this.BASE_URL + 'getAllEngineers');
  }

  addEngineers(engineer: Engineer) {
    
    return this.http.post(this.BASE_URL + 'addEngineer', engineer)
  }

  editEngineer(id: String, engineer: Engineer) {
    return this.http.put(this.BASE_URL + id, engineer);
  }


  deleteEngineer(id: String) {
    return this.http.get(this.BASE_URL + id);
  }
  
  getAlldeletedEngineers() {
    return this.http.get(this.BASE_URL + 'allDeletedEngineers');
  }

  //To delete engineers permanently
  permanentDelete(id: string) {
    return this.http.delete(this.BASE_URL + 'delet/' + id)
  }

  undeleteEngineer(id: string) {
    return this.http.get(this.BASE_URL + 'undelete/' + id);
  }

  // addTechnology(technology: Technology) {
  //   return this.http.post('http://localhost:3000/api/technology/add', technology);
  // }

  getEngineerById(id: string) {
    return this.http.get(this.BASE_URL + 'byId/' + id);
  }

  getAllEngineerSpecific() {
    return this.http.get(this.BASE_URL+ 'getAllSpecific');
  }

  //To HIER
  updateEngineers(id: string, role: string) {
    return this.http.get(this.BASE_URL + 'update/' +id + '/'+ role); 
  }

  //TO UNHIER 
  unhire(id: string, eng: Engineer) {
    return this.http.put(this.BASE_URL + 'unhire/' + id, eng);
  }
}
