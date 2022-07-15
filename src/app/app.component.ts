import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public translate: TranslateService) {
    translate.addLangs(['english', 'urdu','arabic']);
    translate.setDefaultLang('english');

    const browserLang = translate.getBrowserLang()!;
    translate.use(browserLang.match(/english|urdu|arabic/) ? browserLang : 'english');

  }

  title = 'Farm';
  // constructor(private HttpClient: HttpClient){
  //   this.ab()
  // }

  // private ab(): void {

  //   if (environment.production) {
  //     //do something for production enviroment 
  //   }
    
  //   console.log(environment.url)
  // }
}
