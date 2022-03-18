import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postData(data: any) {
    return this.http.post<any>("http://localhost:3000/FarmData/", data);
  }

  getData() {
    return this.http.get<any>("http://localhost:3000/FarmData/")
  }

  putData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/FarmData/" + id, data)
  }

  deleteData(id: number) {
    return this.http.delete<any>("http://localhost:3000/FarmData/" + id)
  }

  updateSignUp(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/signupUsers/" + id, data)
  }
  
  //sales Data
  postSalesData(data: any) {
    return this.http.post<any>("http://localhost:3000/salesData/", data)
  }
  getSalesData() {
    return this.http.get<any>("http://localhost:3000/salesData/")
  }
  putSalesData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/salesData/" + id, data)
  }
  deleteSalesData(id: number) {
    return this.http.delete<any>("http://localhost:3000/salesData/" + id)
  }
  updateSalesData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/salesData/" + id, data)
  }

  //Expenses Data
  postExpenseData(data: any) {
    return this.http.post<any>("http://localhost:3000/expenseData/", data)
  }
  getExpenseData() {
    return this.http.get<any>("http://localhost:3000/expenseData/")
  }
  putExpenseData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/expenseData/" + id, data)
  }
  deleteExpenseData(id: number) {
    return this.http.delete<any>("http://localhost:3000/expenseData/" + id)
  }
  updateExpenseData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/expenseData/" + id, data)
  }
  //Feed Data
  postFeedData(data:any){
    return this.http.post<any>("http://localhost:3000/feedData", data)
  }
  getFeedData(){
    return this.http.get<any>("http://localhost:3000/feedData")
  }
  putFeedData(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/feedData/" +id,data)
  }
  deleteFeedData(id: number) {
    return this.http.delete<any>("http://localhost:3000/feedData/" + id)
  }
  updateFeedData(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/feedData/" + id, data)
  }
  //Vaccine
  postVaccineData(data:any){
    return this.http.post<any>("http://localhost:3000/vaccine", data)
  }
  getVaccineData(){
    return this.http.get<any>("http://localhost:3000/vaccine")
  }
  putVaccineData(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/vaccine" +id,data)
  }
  deleteVaccineData(id: number) {
    return this.http.delete<any>("http://localhost:3000/vaccine/" + id)
  }
  updateVaccineData(data: any, id: number) {
    return this.http.put<any>("  http://localhost:3000/vaccine/" + id, data)
  }

}
