import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Card } from '../common/ui/Card';

export function AuthLayout({ title, subtitle, icon: Icon = Lock, children, showShowcase = true }) {
  return (
    <div className="min-h-screen bg-canvas px-4 py-8 sm:px-6 sm:py-12">
      <div className={`mx-auto grid w-full gap-6 lg:items-center ${showShowcase ? 'max-w-6xl lg:grid-cols-[1.1fr_0.9fr]' : 'max-w-md'}`}>
        {showShowcase ? (
          <div className="hidden rounded-[2rem] border border-border bg-[linear-gradient(135deg,rgba(32,74,120,0.95),rgba(17,32,49,0.94))] p-8 text-text-inverse shadow-floating lg:block">
            <div className="flex h-full flex-col justify-between gap-12">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/70">Compañía Prueba</p>
                <h1 className="mt-6 max-w-lg text-4xl font-extrabold leading-tight tracking-[-0.04em]">
                  Gestión de clientes con una interfaz ejecutiva y consistente.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-white/76">
                  Conserva el flujo de autenticación y mantenimiento mientras ofrece una experiencia más clara en modo claro, oscuro o sistema.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-surface border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Seguridad</p>
                  <p className="mt-2 text-sm text-white/80">Acceso con validación y persistencia de sesión sin cambiar la lógica actual.</p>
                </div>
                <div className="rounded-surface border border-white/10 bg-white/6 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Productividad</p>
                  <p className="mt-2 text-sm text-white/80">Operaciones de clientes centralizadas y listas para trabajo diario.</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <Card className={`mx-auto w-full border-border bg-shell/95 shadow-floating backdrop-blur ${showShowcase ? 'max-w-xl p-5 sm:p-7' : 'max-w-md p-4 sm:p-5'}`}>
          <div className={`mx-auto mb-5 flex items-center justify-center rounded-full bg-accent/10 text-accent ${showShowcase ? 'h-16 w-16' : 'h-14 w-14'}`}>
            <Icon className={showShowcase ? 'h-8 w-8' : 'h-7 w-7'} />
          </div>
          <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-text-muted">Compañía Prueba</p>
            <h2 className={`mt-3 font-extrabold tracking-[-0.04em] text-text-primary ${showShowcase ? 'text-3xl sm:text-[2.15rem]' : 'text-2xl sm:text-[1.9rem]'}`}>{title}</h2>
            {subtitle ? <p className={`mt-3 text-text-secondary ${showShowcase ? 'text-sm leading-7' : 'text-sm leading-6'}`}>{subtitle}</p> : null}
          </div>
          <div className={showShowcase ? 'mt-8' : 'mt-6'}>{children}</div>
          <div className="mt-6 flex items-center justify-center gap-2 rounded-action border border-border bg-surface-alt px-4 py-3 text-xs text-text-secondary lg:hidden">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Tema adaptable a modo claro, oscuro y sistema.
          </div>
        </Card>
      </div>
    </div>
  );
}
