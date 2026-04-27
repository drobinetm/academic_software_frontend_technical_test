import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { getCustomerFullName } from '../../services/customer/customerTransformers';
import { Button } from '../common/ui/Button';
import { Card } from '../common/ui/Card';

export function CustomerListTable({ rows, onEdit, onDelete }) {
  return (
    <Card className="overflow-hidden !rounded-none border-border bg-surface shadow-none">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-accent text-left text-text-inverse">
              <th className="whitespace-nowrap border-b border-white/10 px-4 py-3 font-semibold">Identificación</th>
              <th className="whitespace-nowrap border-b border-white/10 px-4 py-3 font-semibold">Nombre completo</th>
              <th className="whitespace-nowrap border-b border-white/10 px-4 py-3 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((customer) => (
                <tr key={customer.id} className="bg-surface transition hover:bg-surface-alt">
                  <td className="whitespace-nowrap border-b border-border px-4 py-3 text-text-primary">{customer.identificacion || '-'}</td>
                  <td className="border-b border-border px-4 py-3 text-text-primary">{getCustomerFullName(customer) || '-'}</td>
                  <td className="border-b border-border px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Button variant="secondary" size="icon" aria-label="Editar cliente" title="Editar cliente" onClick={() => onEdit(customer)}>
                        <Pencil className="h-4 w-4 text-accent" />
                      </Button>
                      <Button variant="secondary" size="icon" aria-label="Eliminar cliente" title="Eliminar cliente" onClick={() => onDelete(customer)}>
                        <Trash2 className="h-4 w-4 text-danger" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center">
                  <p className="text-lg font-semibold text-text-primary">No se encontraron clientes</p>
                  <p className="mt-2 text-sm text-text-secondary">Ajusta los filtros y ejecuta la búsqueda nuevamente.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
