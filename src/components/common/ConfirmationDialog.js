import React from 'react';
import { CircleX, Trash2, TriangleAlert } from 'lucide-react';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

export function ConfirmationDialog({
  open,
  title,
  description,
  onClose,
  onConfirm,
  loading = false,
  confirmLabel,
  confirmColor = 'danger',
  hideCancel = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      title={title}
      description={description}
      icon={<TriangleAlert className="h-5 w-5 text-danger" />}
      actions={(
        <>
            {!hideCancel ? (
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                <CircleX className="h-5 w-5 text-text-muted" />
                Cancelar
              </Button>
            ) : null}
            <Button variant={confirmColor === 'primary' ? 'primary' : 'danger'} onClick={onConfirm} disabled={loading}>
              <Trash2 className="h-5 w-5" />
              {loading ? 'Procesando...' : confirmLabel || 'Eliminar'}
            </Button>
        </>
      )}
    />
  );
}
