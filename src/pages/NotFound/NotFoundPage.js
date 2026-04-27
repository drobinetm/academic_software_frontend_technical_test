import React from 'react';
import { CircleAlert, House } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { Card } from '../../components/common/ui/Card';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { AppShell } from '../../components/layout/AppShell';
import { AuthLayout } from '../../components/layout/AuthLayout';

function NotFoundContent() {
  const history = useHistory();

  return (
    <Card className="p-8 text-center sm:p-10">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-danger/10 text-danger">
        <CircleAlert className="h-10 w-10" />
      </div>
      <h2 className="mt-5 text-5xl font-extrabold tracking-[-0.05em] text-text-primary">404</h2>
      <p className="mt-3 text-xl font-semibold text-text-primary">Página no encontrada</p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-text-secondary">
        La ruta solicitada no existe dentro del flujo de navegación actual de la SPA.
      </p>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => history.push(ROUTES.home)}>
          <House className="h-5 w-5" />
          Volver al inicio
        </Button>
      </div>
    </Card>
  );
}

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <AppShell title="404" subtitle="Ruta desconocida">
        <NotFoundContent />
      </AppShell>
    );
  }

  return (
    <AuthLayout title="404" subtitle="Ruta desconocida">
      <NotFoundContent />
    </AuthLayout>
  );
}
