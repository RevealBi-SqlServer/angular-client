import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CustomersType } from '../models/customers/customers-type';
import { OrdersType } from '../models/orders/orders-type';
import { CustomersService } from '../services/customers.service';
import { OrdersService } from '../services/orders.service';
import { ISimpleComboSelectionChangingEventArgs } from 'igniteui-angular';

declare let $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$: Subject<void> = new Subject<void>();
	public selectedCustomerId?: string;
	public selectedOrderId?: number;
  public customersCustomers: CustomersType[] = [];
  public value: any = "ALFKI";
  public ordersOrders: OrdersType[] = [];
  public value1: any = 10248;
  public headers: { [key: string]: any } = {};

  @ViewChild('revealView') el!: ElementRef;

  constructor(
    private customersService: CustomersService,
    private ordersService: OrdersService,
  ) {}

  ngOnInit() {
    this.customersService.getCustomersList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.customersCustomers = data
    );
    this.ordersService.getOrdersList().pipe(takeUntil(this.destroy$)).subscribe(
      data => this.ordersOrders = data
    );

    $.ig.RevealSdkSettings.setAdditionalHeadersProvider((url: any) => {
      return this.headers;
    });
  }

  ngAfterViewInit(): void {
    const revealView = new $.ig.RevealView(this.el.nativeElement);
    revealView.startInEditMode = true;
    revealView.interactiveFilteringEnabled = true;

    revealView.onDataSourcesRequested = (callback: any) => {
     
      this.headers["x-header-one"] = this.selectedCustomerId ? this.selectedCustomerId : "ALFKI";
      this.headers["x-header-two"] = this.selectedOrderId && this.selectedOrderId !== 0 ? this.selectedOrderId : 10248;

      var sqlDs = new $.ig.RVAzureSqlDataSource();
      sqlDs.id="sqlServer";
      sqlDs.title = "SQL Server Data Source";
      sqlDs.subtitle = "Full Northwind Database";

      var dsi1 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi1.id="CustOrderHist";
      dsi1.title = "Customer Orders History Stored Proc";
      dsi1.subtitle = "CustomerId Parameter";

      var dsi2 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi2.id="CustOrdersOrders";
      dsi2.title = "Customer Orders Stored Proc";
      dsi2.subtitle = "CustomerId Parameter";

      var dsi3 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi3.id="TenMostExpensiveProducts";
      dsi3.title = "Ten Most Expensive Products";
      dsi3.subtitle = "Stored Procedure";  
      
      var dsi4 = new $.ig.RVAzureSqlDataSourceItem(sqlDs);
      dsi4.id="CustomerOrders";
      dsi4.title = "Customer Orders";
      dsi4.subtitle = "OrderId Parameter";

      callback(new $.ig.RevealDataSources([sqlDs], [dsi1, dsi2, dsi3, dsi4], false));
    };
  }

  public singleSelectComboSelectionChanging(event: ISimpleComboSelectionChangingEventArgs) {
		this.selectedCustomerId = event.newValue as string;
    console.log(this.selectedCustomerId);
	}

	public singleSelectComboSelectionChanging1(event: ISimpleComboSelectionChangingEventArgs) {
		this.selectedOrderId = event.newValue as number;
    console.log(this.selectedOrderId);
	}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
