import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  Getlogin(data: any) {
    return this.http.post("http://localhost:4001/login/", data)
  }

  postData(data: any) {
    return this.http.post<any>("http://localhost:4001/FarmData/", data);
  }

  getData() {
    return this.http.get<any>("http://localhost:4001/FarmsData/")
  }

  putData(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/FarmData/", data,  {headers : {_id : id}})
  }

  deleteData(id: string) {
    return this.http.delete<any>("http://localhost:4001/FarmData" , {headers : {_id : id}})
  }

  updateSignUp(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/register/", data,  {headers : {_id : id}})
  }

  //sales Data
  postSalesData(data: any) {
    return this.http.post<any>("http://localhost:4001/salesData/", data)
  }
  getSalesData() {
    return this.http.get<any>("http://localhost:4001/salesData/")
  }
  putSalesData(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/salesData/", data,  {headers : {_id : id}})
  }
  deleteSalesData(id: string) {
    return this.http.delete<any>("http://localhost:4001/salesData/" , {headers : {_id : id}})
  }

  //Expenses Data
  postExpenseData(data: any) {
    return this.http.post<any>("http://localhost:4001/expenseData/", data)
  }
  getExpenseData() {
    return this.http.get<any>("http://localhost:4001/expenseData/")
  }
  deleteExpenseData(id: string) {
    return this.http.delete<any>("http://localhost:4001/expenseData/", {headers : {_id : id}})
  }
  updateExpenseData(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/expenseData/" , data,  {headers : {_id : id}})
  }

  //Feed Data
  postFeedData(data: any) {
    return this.http.post<any>("http://localhost:4001/feedData", data)
  }
  getFeedData() {
    return this.http.get<any>("http://localhost:4001/feedData")
  }
  deleteFeedData(id: string) {
    return this.http.delete<any>("http://localhost:4001/feedData/", {headers : {_id : id}})
  }
  updateFeedData(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/feedData/" , data,  {headers : {_id : id}})
  }
  //Vaccine
  postVaccineData(data: any) {
    return this.http.post<any>("http://localhost:4001/vaccine", data)
  }
  getVaccineData() {
    return this.http.get<any>("http://localhost:4001/vaccine")
  }
  deleteVaccineData(id: string) {
    return this.http.delete<any>("http://localhost:4001/vaccine/", {headers : {_id : id}})
  }
  updateVaccineData(data: any, id: string) {
    return this.http.put<any>("  http://localhost:4001/vaccine/" , data,  {headers : {_id : id}})
  }

  //dashboard
  getFarmId() {
    return this.http.get<any>("http://localhost:4001/farms")
  }
  form: any;
  setForm(farm: any) {
    this.form = farm;
  }
  //farm
  postFarmData(data: any) {
    return this.http.post<any>("http://localhost:4001/farms", data)
  }
  getFarmData() {
    return this.http.get<any>("http://localhost:4001/farms")
  }
  deleteFarmData(id: string) {
    return this.http.delete<any>("http://localhost:4001/farms/", {headers : {_id : id}})
  }
  updateFarmData(data: any, id: string) {
    return this.http.put<any>("http://localhost:4001/farms/" , data,  {headers : {_id : id}})
  }

  //get All Data 
  getAllData(){
    return this.http.get<any>("http://localhost:4001/GetAllData")
  }

  // Flock Data 
  postFlockData(data:any){
    return this.http.post<any>("http://localhost:4001/flock", data)
  }
  getFlockData(){
    return this.http.get<any>("http://localhost:4001/flock")
  }
  deleteFlockData(id: string){
    return this.http.delete<any>("http://localhost:4001/flock",{headers :{_id : id}})
  }
  updateFlockData(data: any, id: string){
    return this.http.put<any>("http://localhost:4001/flock", data, {headers: {_id: id}})
  }

}
