import React, { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Home,
  Menu,
  MoonStar,
  SunMedium,
  Users,
  MonitorCog,
} from 'lucide-react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import { useThemeMode } from '../../hooks/useThemeMode';
import { cn } from '../../utils/cn';
import { Button } from '../common/ui/Button';

function ThemeModeToggle({ value, active, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      aria-label={value}
      title={value}
      onClick={onClick}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full transition',
        active ? 'bg-accent text-text-inverse shadow-sm' : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function ShellDrawer({ collapsed, username, onNavigate }) {
  const location = useLocation();
  const navItems = useMemo(
    () => [
      { label: 'Inicio', to: ROUTES.home, icon: Home, shortLabel: 'IN' },
      { label: 'Consulta clientes', to: ROUTES.customers, icon: Users, shortLabel: 'CC' },
    ],
    []
  );

  return (
    <aside className={cn('flex h-full min-h-full flex-col border-r border-border bg-shell/95 shadow-shell backdrop-blur', collapsed ? 'px-3 py-4' : 'px-4 py-5')}>
      <div className={cn('flex items-center border-b border-border pb-4', collapsed ? 'justify-center' : 'gap-3')}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border-strong bg-accent/12 text-lg font-bold text-accent shadow-sm">
          {username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        {!collapsed ? (
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Usuario</p>
            <p className="truncate text-sm font-semibold text-text-primary">{username}</p>
          </div>
        ) : null}
      </div>

      {!collapsed ? <p className="px-1 pt-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">Menú</p> : null}

      <nav className={cn('mt-4 grid gap-2', collapsed ? 'justify-items-center' : '')}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === ROUTES.home
            ? location.pathname === item.to
            : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);

          return (
            <NavLink
              key={item.to}
              exact={item.to === ROUTES.home}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                'group flex items-center rounded-[1.1rem] border font-semibold transition',
                isActive
                  ? 'border-border-strong bg-accent/15 text-text-primary shadow-sm dark:bg-accent/20 dark:text-white'
                  : 'border-transparent text-text-secondary hover:bg-surface-muted hover:text-text-primary',
                collapsed ? 'h-12 w-12 justify-center text-sm' : 'gap-3 px-3 py-3 text-sm'
              )}
            >
              {collapsed ? (
                <span className={cn('text-sm font-bold uppercase tracking-[0.12em]', isActive ? 'text-accent' : 'text-text-secondary')}>
                  {item.shortLabel}
                </span>
              ) : (
                <>
                  <span className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full transition',
                    isActive ? 'bg-accent text-text-inverse shadow-sm' : 'bg-surface-muted text-accent'
                  )}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export function AppShell({ title, subtitle, children }) {
  const history = useHistory();
  const { user, logout } = useAuth();
  const { showFeedback } = useFeedback();
  const { themeMode, setThemeMode } = useThemeMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const username = user?.username || 'Nombre de Usuario';

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: SunMedium },
    { value: 'dark', label: 'Oscuro', icon: MoonStar },
    { value: 'system', label: 'Sistema', icon: MonitorCog },
  ];

  const handleLogout = async () => {
    if (logoutLoading) {
      return;
    }

    setLogoutLoading(true);

    try {
      await logout();
    } catch (error) {
      showFeedback({ message: error?.message || 'No fue posible cerrar la sesión correctamente.', severity: 'error' });
    } finally {
      history.push(ROUTES.login);
      setLogoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary">
      <header className="sticky top-0 z-40 border-b border-[#13304b] bg-[#0b2238] text-text-inverse backdrop-blur">
          <div className="mx-auto flex max-w-[1800px] flex-wrap items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setMobileOpen((current) => !current)} className="rounded-none border-0 bg-[#0b2238] text-white hover:bg-[#13304b] hover:text-white lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setCollapsed((current) => !current)} className="hidden rounded-none border-0 bg-[#0b2238] text-white hover:bg-[#13304b] hover:text-white lg:inline-flex">
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold uppercase tracking-[0.28em] text-white/70">Compañía Prueba</p>
              <p className="truncate text-sm font-semibold text-white">{username}</p>
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2 py-1.5 shadow-sm" role="group" aria-label="selector de tema">
              {themeOptions.map((option) => (
                <ThemeModeToggle
                  key={option.value}
                  value={option.label}
                  icon={option.icon}
                  active={themeMode === option.value}
                  onClick={() => setThemeMode(option.value)}
                />
              ))}
            </div>

            <Button variant="secondary" className="h-12 rounded-full !border-white bg-white px-4 text-sm !text-[#0b2238] shadow-sm hover:!border-[#ffd7b8] hover:!bg-[#ffe8d6] hover:!text-[#8a3b12] disabled:!border-white/80 disabled:!bg-white/90 disabled:!text-[#0b2238]/70" onClick={handleLogout} disabled={logoutLoading}>
              <DoorOpen className="h-5 w-5 text-current" />
              {logoutLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-76px)] w-full gap-0 px-0">
        <div className={cn('fixed inset-y-0 left-0 z-50 w-screen bg-slate-950/35 backdrop-blur-sm transition sm:w-[19rem] lg:sticky lg:top-[76px] lg:z-20 lg:h-[calc(100vh-76px)] lg:bg-transparent lg:backdrop-blur-0', mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0', collapsed ? 'lg:w-[5rem]' : 'lg:w-[17rem]')}>
          <div className="h-full">
            <ShellDrawer collapsed={collapsed} username={username} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>

        {mobileOpen ? <button type="button" className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden" aria-label="Cerrar menu" onClick={() => setMobileOpen(false)} /> : null}

        <main className="min-w-0 flex-1 px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
          {(title || subtitle) ? (
            <div className="mb-4 rounded-surface border border-border bg-shell/75 px-4 py-4 shadow-sm backdrop-blur sm:px-5">
              {title ? <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-text-primary">{title}</h1> : null}
              {subtitle ? <p className="mt-2 max-w-3xl text-sm leading-7 text-text-secondary">{subtitle}</p> : null}
            </div>
          ) : null}
          <div className="min-h-[calc(100vh-160px)]">{children}</div>
        </main>
      </div>
    </div>
  );
}
