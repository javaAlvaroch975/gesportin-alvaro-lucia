package net.ausiasmarch.gesportin.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.ausiasmarch.gesportin.bean.PaymentConfirmBean;
import net.ausiasmarch.gesportin.bean.PaymentSessionBean;
import net.ausiasmarch.gesportin.service.PaymentService;

@CrossOrigin(origins = "*", allowedHeaders = "*", maxAge = 3600)
@RestController
@RequestMapping("/payment")
public class PaymentApi {

    @Autowired
    private PaymentService oPaymentService;

    /**
     * Inicia una sesión de pago para una cuota de club.
     * POST /payment/iniciar/cuota/{jugadorId}/{cuotaId}
     */
    @PostMapping("/iniciar/cuota/{jugadorId}/{cuotaId}")
    public ResponseEntity<PaymentSessionBean> iniciarCuota(
            @PathVariable Long jugadorId,
            @PathVariable Long cuotaId) {
        return ResponseEntity.ok(oPaymentService.iniciarPagoCuota(jugadorId, cuotaId));
    }

    /**
     * Inicia una sesión de pago para la tienda (carrito actual del usuario).
     * POST /payment/iniciar/tienda
     */
    @PostMapping("/iniciar/tienda")
    public ResponseEntity<PaymentSessionBean> iniciarTienda() {
        return ResponseEntity.ok(oPaymentService.iniciarPagoTienda());
    }

    /**
     * Obtiene los datos de una sesión de pago por su token.
     * GET /payment/sesion/{sessionToken}
     */
    @GetMapping("/sesion/{sessionToken}")
    public ResponseEntity<PaymentSessionBean> getSesion(@PathVariable String sessionToken) {
        return ResponseEntity.ok(oPaymentService.getSesion(sessionToken));
    }

    /**
     * Confirma el pago enviando los datos de la tarjeta (simulados).
     * POST /payment/confirmar/{sessionToken}
     */
    @PostMapping("/confirmar/{sessionToken}")
    public ResponseEntity<PaymentSessionBean> confirmar(
            @PathVariable String sessionToken,
            @RequestBody PaymentConfirmBean confirmBean) {
        return ResponseEntity.ok(oPaymentService.confirmarPago(sessionToken, confirmBean));
    }

    /**
     * Cancela una sesión de pago pendiente.
     * POST /payment/cancelar/{sessionToken}
     */
    @PostMapping("/cancelar/{sessionToken}")
    public ResponseEntity<PaymentSessionBean> cancelar(@PathVariable String sessionToken) {
        return ResponseEntity.ok(oPaymentService.cancelarPago(sessionToken));
    }
}
