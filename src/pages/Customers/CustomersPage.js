import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { PageSection } from '../../components/common/ui/PageSection';
import { AppShell } from '../../components/layout/AppShell';
import { FormTextField } from '../../components/common/FormTextField';
import { CustomerListTable } from '../../components/customer/CustomerListTable';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { MessageDialog } from '../../components/common/MessageDialog';
import { ROUTES, getCustomerEditRoute } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useCustomerView } from '../../hooks/useCustomerView';
import { deleteCustomerRequest, getCustomersRequest } from '../../services/customer/customerService';
import { getApiErrorMessage } from '../../utils/api';

export function CustomersPage() {
  const history = useHistory();
  const { userid } = useAuth();
  const { listFilters, setListFilters, resetListFilters } = useCustomerView();
  const [initialFilters] = useState(() => listFilters);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteState, setDeleteState] = useState({
    open: false,
    customer: null,
    loading: false,
  });
  const [messageDialog, setMessageDialog] = useState({
    open: false,
    title: '',
    message: '',
    severity: 'success',
  });

  const loadCustomers = useCallback(async (filters = {}) => {
    setLoading(true);

    try {
      const payload = { usuarioId: userid };

      if (filters.nombre?.trim()) {
        payload.nombre = filters.nombre.trim();
      }

      if (filters.identificacion?.trim()) {
        payload.identificacion = filters.identificacion.trim();
      }

      const response = await getCustomersRequest(payload);
      setCustomers(response);
    } catch (error) {
      setMessageDialog({
        open: true,
        title: 'No fue posible cargar los clientes',
        message: getApiErrorMessage(error, 'No se pudieron cargar los clientes.'),
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  }, [userid]);

  useEffect(() => {
    loadCustomers(initialFilters);
  }, [initialFilters, loadCustomers]);

  const handleFilterChange = (field) => (event) => {
    setListFilters((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleDeleteConfirm = async () => {
    if (!deleteState.customer) {
      return;
    }

    setDeleteState((current) => ({ ...current, loading: true }));

    try {
      await deleteCustomerRequest(deleteState.customer.id);
      setDeleteState({ open: false, customer: null, loading: false });
      setMessageDialog({
        open: true,
        title: 'Cliente eliminado',
        message: 'El cliente fue eliminado correctamente.',
        severity: 'success',
      });
      await loadCustomers(listFilters);
    } catch (error) {
      setDeleteState({ open: false, customer: null, loading: false });
      setMessageDialog({
        open: true,
        title: 'No pudimos eliminar el cliente',
        message: getApiErrorMessage(error, 'No pudimos eliminar el cliente en este momento. Por favor intenta nuevamente.'),
        severity: 'error',
      });
    }
  };

  return (
    <AppShell title="Consulta de clientes" subtitle="Filtra clientes existentes, consulta resultados y accede al mantenimiento desde una sola pantalla.">
      <PageSection>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Consulta de clientes</p>
            <h2 className="mt-2 text-2xl font-bold tracking-[-0.04em] text-text-primary">Búsqueda y acciones</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button variant="secondary" onClick={() => history.push(ROUTES.customerCreate)}>
              <Plus className="h-4 w-4 text-accent" />
              Agregar
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                resetListFilters();
                history.push(ROUTES.home);
              }}
            >
              <ArrowLeft className="h-4 w-4 text-accent" />
              Regresar
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-end">
          <FormTextField label="Nombre" value={listFilters.nombre} onChange={handleFilterChange('nombre')} />
          <FormTextField label="Identificación" value={listFilters.identificacion} onChange={handleFilterChange('identificacion')} />
          <Button variant="secondary" className="h-14 w-14 px-0" aria-label="Buscar" title="Buscar" onClick={() => loadCustomers(listFilters)}>
            <Search className="h-5 w-5 text-accent" />
          </Button>
        </div>

        <div className="mt-6">
          {loading ? (
            <LoadingFallback label="Cargando clientes" />
          ) : (
            <CustomerListTable
              rows={customers}
              onEdit={(customer) => history.push(getCustomerEditRoute(customer.id))}
              onDelete={(customer) => setDeleteState({ open: true, customer, loading: false })}
            />
          )}
        </div>
      </PageSection>

      <ConfirmationDialog
        open={deleteState.open}
        title="Eliminar cliente"
        description="¿Estás seguro de que deseas eliminar el cliente seleccionado? Esta acción llamará inmediatamente al endpoint de eliminación."
        loading={deleteState.loading}
        onClose={() => setDeleteState({ open: false, customer: null, loading: false })}
        onConfirm={handleDeleteConfirm}
      />

      <MessageDialog
        open={messageDialog.open}
        title={messageDialog.title}
        message={messageDialog.message}
        severity={messageDialog.severity}
        onClose={() => setMessageDialog((current) => ({ ...current, open: false }))}
      />
    </AppShell>
  );
}
