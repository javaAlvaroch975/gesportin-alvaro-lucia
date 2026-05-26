import { Component, signal } from '@angular/core';
import { PaymentTeamadminPlist } from '../../../../component/payment/teamadmin/plist/plist';
import { BreadcrumbComponent, BreadcrumbItem } from '../../../../component/shared/breadcrumb/breadcrumb';

@Component({
  selector: 'app-payment-teamadmin-plist-page',
  standalone: true,
  imports: [PaymentTeamadminPlist, BreadcrumbComponent],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PaymentTeamadminPlistPage {
  breadcrumbItems = signal<BreadcrumbItem[]>([
    { label: 'Mi Club', route: '/club/teamadmin' },
    { label: 'Sesiones de pago' },
  ]);
}
