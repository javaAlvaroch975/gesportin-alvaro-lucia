export interface IPaymentSession {
  id: number;
  sessionToken: string;
  tipo: string;
  descripcion: string;
  importe: number;
  estado: string;
  fecha: string;
}

export interface IPaymentConfirm {
  titular: string;
  numeroTarjeta: string;
  caducidad: string;
  cvv: string;
}

export interface IPaymentSessionToken {
  sessionToken: string;
}
