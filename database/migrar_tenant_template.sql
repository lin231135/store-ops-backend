-- ============================================
-- Script de migración para tenant_template
-- Aplica el modelo definido en V1
-- ============================================

\c tenant_template

-- Crear tabla tenants
CREATE TABLE tenants (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índice
CREATE INDEX idx_tenants_nombre ON tenants(nombre);

-- Insertar datos iniciales
INSERT INTO tenants (nombre, estado) VALUES 
    ('Tenant Alpha', TRUE),
    ('Tenant Beta', TRUE),
    ('Tenant Gamma', FALSE),
    ('Tenant Delta', TRUE);