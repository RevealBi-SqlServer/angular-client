import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ISimpleComboSelectionChangingEventArgs } from 'igniteui-angular';
import { Subject, takeUntil } from 'rxjs';
import { DashboardNames } from '../models/reveal-server/dashboard-names';
import { RevealServerService } from '../services/reveal-server.service';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public selectedDashboard: string = 'Healthcare';
  public revealServerDashboardNames: DashboardNames[] = [];
  @ViewChild('revealView') el!: ElementRef;
  public headers: { [key: string]: string } = {};

  constructor(
    private revealServerService: RevealServerService,
  ) {  }

  ngOnInit() {
    
    $.ig.RevealSdkSettings.setAdditionalHeadersProvider((url: any) => {
      return this.headers;
    });
    
    this.revealServerService.getDashboardNamesList().pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.revealServerDashboardNames = data;

        if (this.revealServerDashboardNames.length > 0) {
          this.selectedDashboard = this.revealServerDashboardNames[0].dashboardTitle;
          this.loadDashboard(this.selectedDashboard);
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
    this.selectedDashboard = event.newValue as string;
    await this.loadDashboard(this.selectedDashboard);
  }

  private async loadDashboard(dashboardName: string) {
    // Set your headers here to pass the authorization token to UserContext provider in the server
    // In this app, I am hard-coding values, in your app, use your own logic to pass the token
    // to the server
    this.headers["x-header-one"] = "ALFKI";
    this.headers["x-header-two"] = "10248";

    let dashboard = await $.ig.RVDashboard.loadDashboard(dashboardName);
    var revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.interactiveFilteringEnabled = true;
    revealView.dashboard = dashboard;
  }
}
