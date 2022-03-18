import { ExpenseDialogComponent } from './../expense-dialog/expense-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  displayedColumns: any[] = ['date', 'utility', 'salary', 'maintenance', 'note', 'action'];

  total: number = 0;

  constructor(private dialog: MatDialog, private apiService: ApiService,private cd: ChangeDetectorRef) { }
 
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    this.getAllData()
  }

  openDialog() {
    this.dialog.open(ExpenseDialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData();
      }
    })
  }

  storedata:any;

  getAllData() {
    this.apiService.getExpenseData()
      .subscribe({
        next: (res) => {
          console.log("HELLLOOOOO", res)
          this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });

          this.total = 0;
          this.dataSource.data.map(t => {
            this.total += t.utility + t.salary + t.maintenance;
          })

          this.storedata = res;
        }, error: () => {
          alert("Error occured while fetching records")
        }
      })
  }

  editData(row: any) {
    this.dialog.open(ExpenseDialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData()
      }
    })
  }

  deleteData(id: number) {
    this.apiService.deleteExpenseData(id)
      .subscribe({
        next: (res) => {
          alert("Data Deleted Successfully")
          this.getAllData()
        },
        error: () => {
          alert("Error while fetching Data")
        }
      })
  }

  // deleteAll(){
  //   this.storedata.forEach((element:any) => {
  //     console.log(element.id);
  //     this.apiService.deleteExpenseData(element.id)
  //     .subscribe(
  //       res=>{
  //         console.log(res)      
  //       });
  //   });  
  // }

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
