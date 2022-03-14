import { ApiService } from './../../services/api.service';
import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {

  displayedColumns: any[] = ['date', 'age', 'mortality', 'cumMortality', 'cumMortalityPercent', 'feed', 'usedFeed', 'cumFeed', 'diesel', 'cumDiesel','weight', 'note', 'action'];
  dataSource!: MatTableDataSource<any>;

  // totalBird: number =18000;


  totalSum: number = 0;
  totalFeed: number = 0;
  usedFeed: number = 0;
  diesel: number = 0;

  cumMor: any = 0;
  cumTotal: any;
  cumResult: any;
  i: number = 0;
  dataa: any;

  Feed: any = 0;
  FeedTotal: any;

  Diesel: any;
  dieselCum: any;

  weight: number= 0;

  x: any[] = [];
  percent: any;
  cumMortalityPercent: any;

  birdss: any = "";

  d = new Date();



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild('birds') birdKey!: ElementRef;
  SelectBird() {
    localStorage.setItem("birds", this.birdKey.nativeElement.value)
  }


  constructor(public dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    // this.cumSum()
    this.getAllData()

  }

  ngDoCheck() {
    this.birdss = localStorage.getItem("birds")!;


  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%',
    }).afterClosed().subscribe(val => {
      if (val == 'save') {
        this.getAllData();
      }
    })
  }

  getAllData() {
    this.api.getData()
      .subscribe({
        next: (res) => {

          this.dataSource = new MatTableDataSource(res);
          setTimeout(() => {
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
          });
   
          //for calculating Sum
          this.totalSum = 0;
          console.log(this.dataSource.data.map(d => {
            this.totalSum += d.mortality;
          }))
          console.log("sum of Mortality: ", this.totalSum)

          //for weight total
          this.weight = 0;
          this.dataSource.data.map(w=>{
            this.weight += w.weight;
          })

          //for total feed
          this.totalFeed = 0;
          this.dataSource.data.map(f => {
            this.totalFeed += f.feed;
          })

          //for total used feed
          this.usedFeed = 0;
          this.dataSource.data.map(u => {
            this.usedFeed += u.usedFeed;
          })

          //for total diesel calculation
          this.diesel = 0;
          this.dataSource.data.map(d => {
            this.diesel += d.diesel
          })


          //for cummulative sum 
          this.cumTotal = [];
          this.cumResult = 0;

          this.dataSource.data.map(m => {
            this.cumResult += m.mortality;
            this.cumTotal.push(this.cumResult);
            m.cumMortality = this.cumTotal
          });
          // for(let i = 0; i < m.mortality ; i++ ){
          //   this.cumResult += m.mortality;
          //   // this.cumTotal = this.cumTotal + m.mortality;
          //   this.cumTotal.push(this.cumResult);

          // }
          // console.log("new cummulative : " + this.cumResult)
          console.log("Testing for Cummulative " + this.cumTotal)

          //For Cummulative Feed
          this.FeedTotal = [];
          this.Feed = 0;
          this.dataSource.data.map(f => {
            this.Feed += f.usedFeed;
            this.FeedTotal.push(this.Feed);
            f.cumFeed = this.FeedTotal
          })
          console.log("Feed Total: " + this.FeedTotal)

          //For Cummulative Diesel
          this.dieselCum = [];
          this.Diesel = 0;
          this.dataSource.data.map(d => {
            this.Diesel += d.diesel;
            this.dieselCum.push(this.Diesel);
            d.cumDiesel = this.dieselCum
          })
          console.log("Cummulative Diesel: " + this.dieselCum)

          //for cum Percentage of Mortality

          // this.cumMortalityPercent = [];
          this.percent;

          for (let index = 0; index < this.cumTotal.length; index++) {
            const element = this.cumTotal[index];
            this.percent = element * 100 / this.birdss;

            this.x.push(this.percent);
          }
          this.dataSource.data.map(p => {
            p.cumMortalityPercent = this.x;
            // this.percent = p.mortality * 100 / this.totalBird ;
          })

          console.log("cum Mortality Percentage : " + this.cumMortalityPercent)

          //end cum mortality 

          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error Occured while Fetching Records")
        }
      })
  }

  editData(row: any) {
    this.dialog.open(DialogComponent, {
      width: '50%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val == 'update') {
        this.getAllData()
      }
    })
  }

  deleteData(id: number) {
    this.api.deleteData(id)
      .subscribe({
        next: (res) => {
          alert("Product Deleted Successfully")
          this.getAllData();
        },
        error: () => {
          alert("Error While Deleting Data")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  print() {
    window.print()
  }


  /* For Testing purpose */

  // gett(){
  //  let muUser: any[]= [{
  //     name:"ahsan",
  //     id:10
  //   },
  //   {
  //     name:"ahsan",
  //     id:12
  //   },
  //   {
  //     name:"ahsan",
  //     id:17
  //   },
  // ]
  //   // let array=[8,2,3];
  //   // let answer=array.reduce((acc,val)=>acc+val);
  //   // console.log(answer)

  //   console.log(muUser.reduce((acc,val) => acc+val.id,0))
  // }

  // total(data: any){
  //   if(data){
  //     this.totalSum += Number(data);
  //   }
  //   console.log("asdf", (this.totalSum))

  // }


  // cumSum(){
  //   let num: any= [1,2,3,4,5];
  //   let total = 0;
  //   let result = [];

  //   for(let i = 0; i < num.length; i++ ){
  //     total = total + num[i];
  //     result.push(total )

  //   }

  //   console.log(" Testing of Cummulative sum:  [1,2,3,4,5] = " + result);
  // }

}

