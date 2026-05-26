package net.ausiasmarch.gesportin.bean;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/** DTO devuelto al iniciar una sesión de pago. */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSessionBean {
    private Long id;
    private String sessionToken;
    private String tipo;
    private String descripcion;
    private double importe;
    private String estado;
    private LocalDateTime fecha;
}
