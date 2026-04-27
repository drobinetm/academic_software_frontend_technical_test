import React from 'react';
import { ArrowRight, LayoutDashboard, Users } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { Card } from '../../components/common/ui/Card';
import { AppShell } from '../../components/layout/AppShell';
import { ROUTES } from '../../constants/routes';

export function HomePage() {
  const history = useHistory();

  return (
    <AppShell>
      <Card className="overflow-hidden border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(246,249,252,0.98))] p-5 shadow-floating dark:bg-[linear-gradient(135deg,rgba(20,28,37,0.98),rgba(15,22,30,0.98))] sm:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="relative">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-accent/10 text-accent">
              <LayoutDashboard className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-[-0.06em] text-text-primary sm:text-[3.05rem]">Bienvenido</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-text-secondary sm:text-base">
              Administra registros, consultas y actualizaciones de clientes desde un solo panel con una navegación más compacta y una interfaz ejecutiva coherente en todos los modos de tema.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => history.push(ROUTES.customers)}>
                <Users className="h-5 w-5" />
                Consulta clientes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="w-full border-border bg-surface-alt p-5 shadow-surface">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Gestión de clientes</p>
            <p className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-text-primary">Sistema activo</p>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              El dashboard mantiene disponible el acceso a consulta, creación, edición y eliminación de clientes dentro del flujo actual.
            </p>
          </Card>
        </div>
      </Card>
    </AppShell>
  );
}
