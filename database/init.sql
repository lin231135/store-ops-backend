-- ============================================
-- V1: Crear tabla de gestión de tenants
-- ============================================

CREATE TABLE IF NOT EXISTS tenants (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por nombre
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tenants_nombre') THEN
        CREATE INDEX idx_tenants_nombre ON tenants(nombre);
    END IF;
END $$;

-- ============================================
-- Datos iniciales de prueba
-- ============================================

INSERT INTO tenants (nombre, estado) VALUES 
    ('Tenant Alpha', TRUE),
    ('Tenant Beta', TRUE),
    ('Tenant Gamma', FALSE),
    ('Tenant Delta', TRUE)
ON CONFLICT (id) DO NOTHING;