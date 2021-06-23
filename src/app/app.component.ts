import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  private updateSubscription: Subscription;

  ngOnInit(): void {
  

  this.updateSubscription = interval(100).subscribe(
    (val) => {       
  this.localUser = JSON.parse(localStorage.getItem('userData'));

      });
    }
  title = 'admin-panel-layout';
  sideBarOpen = true;
  localUser: any;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
