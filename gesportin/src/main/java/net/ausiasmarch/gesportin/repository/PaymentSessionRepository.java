package net.ausiasmarch.gesportin.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.ausiasmarch.gesportin.entity.PaymentSessionEntity;

public interface PaymentSessionRepository extends JpaRepository<PaymentSessionEntity, Long> {

    Optional<PaymentSessionEntity> findBySessionToken(String sessionToken);

    /** Sesiones del club: TIENDA (usuario.club) o CUOTA (jugador.usuario.club) */
    @Query("SELECT ps FROM PaymentSessionEntity ps WHERE " +
           "(ps.tipo = 'TIENDA' AND EXISTS " +
           "  (SELECT u FROM UsuarioEntity u WHERE u.id = ps.idReferencia AND u.club.id = :clubId)) OR " +
           "(ps.tipo = 'CUOTA' AND EXISTS " +
           "  (SELECT j FROM JugadorEntity j WHERE j.id = ps.idReferencia AND j.usuario.club.id = :clubId))")
    Page<PaymentSessionEntity> findByClubId(@Param("clubId") Long clubId, Pageable pageable);
}
