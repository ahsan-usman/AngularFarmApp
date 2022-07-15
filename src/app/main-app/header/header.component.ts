import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, NavigationEnd, Router, NavigationStart } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  farmid: string = '';
  UserName: string = '';
  input: string = '';
  result: string = '';
  FarmName: string = '';
  FlockName: string = '';
  apiValue: string = '';
  UserData: any;
  selectFarmValue: any;
  selectFlockValue: any;
  selectedValueOfFlock: any;
  shouldShowFarmSelect = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    public route: Router,
    private apiService: ApiService,
  ) {
    this.activatedRoute.queryParams.subscribe(s => {
      this.FarmName = s['farmName'];
      this.FlockName = s['flockName'];
    });
  }

  ngOnInit(): void {
    this.route.events.subscribe((val) => {
        if (val instanceof NavigationStart) {
          this.shouldShowFarmSelect = false;
        }
        if(val instanceof NavigationEnd) {
          this.shouldShowFarmSelect = true;
        }
        if(this.route.url.includes('/dashboard')){
          this.shouldShowFarmSelect = false;
        }
        if(this.route.url.includes('/farmData')){
          this.shouldShowFarmSelect = false;
        }
        if(this.route.url.includes('/flockData')){
          this.shouldShowFarmSelect = false;
        }
        
    });
    const isDashboardRoute = this.route.url.includes('/dashboard')
    if (isDashboardRoute) {
      this.shouldShowFarmSelect = false;
    }

    this.UserData = JSON.parse(localStorage.getItem("userData")!);
    this.UserName = this.UserData?.fullname;

    this.apiService.getFarmData()
      .subscribe(res => {
        this.selectFarmValue = res;
      })
  }

  SelectFarm(val: any) {
    this.apiValue = val;
    const testing = this.selectFarmValue.filter((x: any) => { if (x.farmName == val) { return x._id; } });
    testing.forEach((element: any) => {
      this.farmid = element._id;
    });

    this.apiService.getFlockData()
      .subscribe(res => {
        this.selectFlockValue = res;
        this.selectFlockValue = this.selectFlockValue.filter((x: any) => x.farms_id == this.farmid);
      })
    this.onFarmSelect(val);
  }

  SelectFLock(val: any) {
    this.selectedValueOfFlock = val;
    const flock = this.selectFlockValue.find((x: any) => x.flockName == this.selectedValueOfFlock);
    const FlockID = flock._id;
    localStorage.setItem("flockid", FlockID)
    this.onFarmSelect(this.selectedValueOfFlock)
  }
  
  onFarmSelect(val: any) {
    this.route.navigate([], { queryParams: { farmName: this.apiValue, flockName: this.selectedValueOfFlock } });
  }

  pressNum(num: string) {
    if (num == ".") {
      if (this.input != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
    //Do Not Allow 0 at beginning. 
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }
    this.input = this.input + num
    this.calcAnswer();
  }
  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }
  pressOperator(op: string) {
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }
    this.input = this.input + op
    this.calcAnswer();
  }
  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }

  public logOut() {
    localStorage.removeItem("userData")
    localStorage.clear()
  }

}


