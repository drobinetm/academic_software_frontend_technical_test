import React from 'react';
import { CircleAlert, CircleCheckBig, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { Dialog } from './ui/Dialog';

export function MessageDialog({
  open,
  title,
  message,
  severity = 'success',
  onClose,
  actionLabel = 'Aceptar',
}) {
  const isError = severity === 'error';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={message}
      icon={isError ? <CircleAlert className="h-5 w-5 text-danger" /> : <CircleCheckBig className="h-5 w-5 text-success" />}
      actions={(
        <Button onClick={onClose}>
          <Check className="h-5 w-5" />
          {actionLabel}
        </Button>
      )}
    />
  );
}
