import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { VaccineDialogComponent } from '../vaccine-dialog/vaccine-dialog.component';

@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css']
})
export class VaccineComponent implements OnInit {
  Totalbirds: any = "";

  displayedColumns: any[] = ['date', 'medicine', 'price', 'quantity', 'vaccinated','note', 'action'];
  totalVaccinatedBirds: number = 0;
  remaining: number =0;

  @ViewChild('birds') birdKey!: ElementRef;
  SelectBird() {
    localStorage.setItem("birds", this.birdKey.nativeElement.value)
  }
  constructor(private dialog: MatDialog, private apiService:ApiService) { }
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllData()
  }
  ngDoCheck() {
    this.Totalbirds = localStorage.getItem("birds")!;
  }

  getAllData(){
    this.apiService.getVaccineData()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });

          this.totalVaccinatedBirds = 0;
          this.dataSource.data.map(m=>{
            this.totalVaccinatedBirds += m.vaccinated;
          })

          this.remaining = 0;
          this.dataSource.data.map(r=>{
            this.remaining = this.Totalbirds - this.totalVaccinatedBirds; 
          })
          console.log("boom boooo", this.remaining)

      },error:()=>{
        alert("Error occured while fetching records")
      }
    })
  }
  editData(row:any){
    this.dialog.open(VaccineDialogComponent,{
      width: '50%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val == 'update'){
        this.getAllData()
      }
    })
  }
  openDialog() {
    this.dialog.open(VaccineDialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData();
      }
    })
  }

  deleteData(id:number){
    this.apiService.deleteVaccineData(id)
    .subscribe({
      next:(res)=>{
        alert("Data Deleted Successfully")
        this.getAllData()
      },
      error:()=>{
        alert("Error while fetching Data")
      }
    })
  }
  print() {
    window.print()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
