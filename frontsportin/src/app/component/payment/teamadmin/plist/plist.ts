import { Component, computed, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { IPaymentSession } from '../../../../model/payment-session';
import { IPage } from '../../../../model/plist';
import { PaymentService } from '../../../../service/payment.service';
import { Paginacion } from '../../../shared/paginacion/paginacion';
import { BotoneraRpp } from '../../../shared/botonera-rpp/botonera-rpp';

@Component({
  standalone: true,
  selector: 'app-payment-teamadmin-plist',
  imports: [Paginacion, BotoneraRpp, DecimalPipe, DatePipe],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PaymentTeamadminPlist implements OnInit, OnDestroy {
  oPage = signal<IPage<IPaymentSession> | null>(null);
  numPage = signal<number>(0);
  numRpp = signal<number>(10);
  orderField = signal<string>('id');
  orderDirection = signal<'asc' | 'desc'>('desc');
  totalRecords = computed(() => this.oPage()?.totalElements ?? 0);

  private paymentService = inject(PaymentService);

  ngOnInit(): void {
    this.getPage();
  }

  ngOnDestroy(): void {}

  getPage(): void {
    this.paymentService
      .getPageTeamAdmin(this.numPage(), this.numRpp(), this.orderField(), this.orderDirection())
      .subscribe({
        next: (data: IPage<IPaymentSession>) => {
          this.oPage.set(data);
          if (this.numPage() > 0 && this.numPage() >= data.totalPages) {
            this.numPage.set(data.totalPages - 1);
            this.getPage();
          }
        },
        error: (err: HttpErrorResponse) => console.error('Error cargando sesiones de pago:', err),
      });
  }

  onOrder(field: string): void {
    if (this.orderField() === field) {
      this.orderDirection.set(this.orderDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.orderField.set(field);
      this.orderDirection.set('asc');
    }
    this.numPage.set(0);
    this.getPage();
  }

  onRppChange(n: number): void {
    this.numRpp.set(n);
    this.numPage.set(0);
    this.getPage();
  }

  goToPage(n: number): void {
    this.numPage.set(n);
    this.getPage();
  }

  estadoBadge(estado: string): string {
    switch (estado) {
      case 'COMPLETADO': return 'badge bg-success';
      case 'CANCELADO':  return 'badge bg-danger';
      default:           return 'badge bg-warning text-dark';
    }
  }
}
