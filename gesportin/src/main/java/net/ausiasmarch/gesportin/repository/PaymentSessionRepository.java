package net.ausiasmarch.gesportin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.ausiasmarch.gesportin.entity.PaymentSessionEntity;

public interface PaymentSessionRepository extends JpaRepository<PaymentSessionEntity, Long> {

    Optional<PaymentSessionEntity> findBySessionToken(String sessionToken);
}
