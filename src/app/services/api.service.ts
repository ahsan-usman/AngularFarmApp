import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(data: any){
    return this.http.post<any>("http://localhost:3000/FarmData/", data);
  }

  getData(){
    return this.http.get<any>("http://localhost:3000/FarmData/")
  }

  putData(data: any,id: number){
    return this.http.put<any>("http://localhost:3000/FarmData/" +id, data)
  }

  deleteData(id: number){
    return this.http.delete<any>("http://localhost:3000/FarmData/" +id)
  }
}
