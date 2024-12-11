import React from 'react';

export const DashboardPage: React.FC = () => {
    return (
        <>
            <p>
                Sección Superior (Resumen) Total de deuda pendiente: $XX,XXX
                Total cobrado: $XX,XXX Clientes morosos: 20% Clientes al día:
                80% Gráficos (Debajo del resumen) Deuda por cliente: Gráfico de
                barras o pastel. Pagos realizados: Gráfico de líneas mostrando
                la evolución de pagos. Tabla de Clientes Nombre del cliente |
                Cuota | Deuda | Próximo pago | Tasa | Acciones (con botones para
                editar, amortizar, contactar, etc.) Filtros y Buscador Filtros
                para mostrar clientes por estado de pago, próximos pagos, etc.
                Alertas (en la parte superior o como notificaciones) Alerta de
                pago vencido o cliente moroso.
            </p>
        </>
    );
};
