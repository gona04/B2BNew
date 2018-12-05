import { Injectable } from '@angular/core';
import { Jobs } from './jobs.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private BASE_URL = environment.apiUrl + "jobs/";
  constructor(private http: HttpClient) { }

  addJobs(job: Jobs) {
   return this.http.post(this.BASE_URL + 'add', job);
  }

  getJobs(id: string) {
    return this.http.get(this.BASE_URL + 'getAllJobs/' + id);
  }
}
