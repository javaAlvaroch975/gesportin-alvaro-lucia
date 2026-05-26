import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serverURL } from '../environment/environment';
import { IPaymentConfirm, IPaymentSession } from '../model/payment-session';
import { IPage } from '../model/plist';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly url = `${serverURL}/payment`;

  iniciarCuota(jugadorId: number, cuotaId: number): Observable<IPaymentSession> {
    return this.http.post<IPaymentSession>(`${this.url}/iniciar/cuota/${jugadorId}/${cuotaId}`, {});
  }

  iniciarTienda(): Observable<IPaymentSession> {
    return this.http.post<IPaymentSession>(`${this.url}/iniciar/tienda`, {});
  }

  getSesion(sessionToken: string): Observable<IPaymentSession> {
    return this.http.post<IPaymentSession>(`${this.url}/sesion`, { sessionToken });
  }

  confirmar(sessionToken: string, datos: IPaymentConfirm): Observable<IPaymentSession> {
    return this.http.post<IPaymentSession>(`${this.url}/confirmar`, { sessionToken, ...datos });
  }

  cancelar(sessionToken: string): Observable<IPaymentSession> {
    return this.http.post<IPaymentSession>(`${this.url}/cancelar`, { sessionToken });
  }

  getPageAdmin(
    page: number = 0,
    size: number = 10,
    sort: string = 'id',
    direction: string = 'desc',
  ): Observable<IPage<IPaymentSession>> {
    const url = `${this.url}/admin/plist?page=${page}&size=${size}&sort=${sort}&direction=${direction}`;
    return this.http.get<IPage<IPaymentSession>>(url);
  }

  getPageTeamAdmin(
    page: number = 0,
    size: number = 10,
    sort: string = 'id',
    direction: string = 'desc',
  ): Observable<IPage<IPaymentSession>> {
    const url = `${this.url}/teamadmin/plist?page=${page}&size=${size}&sort=${sort}&direction=${direction}`;
    return this.http.get<IPage<IPaymentSession>>(url);
  }
}
