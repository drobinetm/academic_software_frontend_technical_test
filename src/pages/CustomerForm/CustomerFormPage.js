import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ChevronDown, Save, UserRound } from 'lucide-react';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { PageSection } from '../../components/common/ui/PageSection';
import { AppShell } from '../../components/layout/AppShell';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { FormTextField } from '../../components/common/FormTextField';
import { LoadingFallback } from '../../components/common/LoadingFallback';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useCustomerView } from '../../hooks/useCustomerView';
import { useFeedback } from '../../hooks/useFeedback';
import { createCustomerRequest, getCustomerByIdRequest, updateCustomerRequest } from '../../services/customer/customerService';
import {
  createEmptyCustomerForm,
  mapCustomerDetailToForm,
  mapCustomerFormToCreatePayload,
  mapCustomerFormToUpdatePayload,
} from '../../services/customer/customerTransformers';
import { getInterestsRequest } from '../../services/interest/interestService';
import { readFileAsBase64, isSupportedImageFile } from '../../utils/file';
import { customerSchema, getValidationErrors } from '../../utils/validators';
import { getApiErrorMessage } from '../../utils/api';

export function CustomerFormPage() {
  const history = useHistory();
  const { id } = useParams();
  const { userid } = useAuth();
  const { setListFilters } = useCustomerView();
  const { showFeedback } = useFeedback();
  const isEditMode = Boolean(id);
  const [values, setValues] = useState(createEmptyCustomerForm());
  const [errors, setErrors] = useState({});
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadPage = async () => {
      setLoading(true);

      try {
        const [interestsResponse, customerDetail] = await Promise.all([
          getInterestsRequest(),
          isEditMode ? getCustomerByIdRequest(id) : Promise.resolve(null),
        ]);

        if (!mounted) {
          return;
        }

        setInterests(interestsResponse);

        if (customerDetail) {
          setValues(mapCustomerDetailToForm(customerDetail));
        }
      } catch (error) {
        showFeedback({ message: getApiErrorMessage(error, 'No se pudieron cargar las dependencias del formulario.'), severity: 'error' });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPage();

    return () => {
      mounted = false;
    };
  }, [id, isEditMode, showFeedback]);

  const selectErrors = useMemo(
    () => ({
      sexo: errors.sexo,
      interesId: errors.interesId,
    }),
    [errors]
  );

  const handleChange = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!isSupportedImageFile(selectedFile)) {
      setErrors((current) => ({
        ...current,
        imagen: 'Selecciona un archivo de imagen válido.',
      }));
      return;
    }

    try {
      const base64Value = await readFileAsBase64(selectedFile);
      setValues((current) => ({
        ...current,
        imagen: base64Value,
      }));
      setErrors((current) => ({
        ...current,
        imagen: '',
      }));
    } catch (error) {
      setErrors((current) => ({
        ...current,
        imagen: error.message,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');

    const validationErrors = getValidationErrors(customerSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);

    try {
      if (isEditMode) {
        await updateCustomerRequest(mapCustomerFormToUpdatePayload(values, userid));
        showFeedback({ message: 'Cliente actualizado correctamente.', severity: 'success' });
      } else {
        await createCustomerRequest(mapCustomerFormToCreatePayload(values, userid));
        setListFilters({ nombre: '', identificacion: '' });
        showFeedback({ message: 'Cliente creado correctamente.', severity: 'success' });
      }

      history.push(ROUTES.customers);
    } catch (error) {
      setSubmitError(getApiErrorMessage(error, 'No se pudo guardar el cliente. Intenta nuevamente.'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <LoadingFallback label="Cargando formulario de clientes" />
      </AppShell>
    );
  }

  return (
    <AppShell title="Mantenimiento de clientes" subtitle={isEditMode ? 'Actualiza la información del cliente seleccionado.' : 'Registra un nuevo cliente con todos los campos requeridos.'}>
      <PageSection>
        <div className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <label className="group flex h-[76px] w-[76px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-surface-alt text-text-secondary transition hover:bg-surface-muted">
              {values.imagen ? (
                <img src={values.imagen} alt="Vista previa del cliente" className="h-full w-full object-cover" />
              ) : (
                <UserRound className="h-10 w-10" />
              )}
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </label>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-muted">Imagen opcional</p>
              <p className="mt-2 text-xl font-bold tracking-[-0.03em] text-text-primary">Perfil del cliente</p>
              {errors.imagen ? <p className="mt-2 text-sm text-danger">{errors.imagen}</p> : <p className="mt-2 text-sm text-text-secondary">Carga una imagen si deseas adjuntarla al registro.</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button type="submit" form="customer-form" variant="secondary" disabled={saving}>
              <Save className="h-4 w-4 text-accent" />
              {saving ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button variant="secondary" onClick={() => history.push(ROUTES.customers)} disabled={saving}>
              <ArrowLeft className="h-4 w-4 text-accent" />
              Regresar
            </Button>
          </div>
        </div>

        <form id="customer-form" onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <FormTextField label="Identificación *" value={values.identificacion} onChange={handleChange('identificacion')} error={errors.identificacion} keepLabel />
          <FormTextField label="Nombre *" value={values.nombre} onChange={handleChange('nombre')} error={errors.nombre} keepLabel />
          <FormTextField label="Apellidos *" value={values.apellidos} onChange={handleChange('apellidos')} error={errors.apellidos} keepLabel />

          <FormTextField
            select
            label="Género *"
            value={values.sexo}
            onChange={handleChange('sexo')}
            error={selectErrors.sexo}
            SelectProps={{ IconComponent: ChevronDown }}
          >
            <option value="">Seleccione</option>
            <option value="F">Femenino</option>
            <option value="M">Masculino</option>
          </FormTextField>
          <FormTextField label="Fecha de nacimiento *" type="date" value={values.fNacimiento} onChange={handleChange('fNacimiento')} error={errors.fNacimiento} />
          <FormTextField label="Fecha de afiliación *" type="date" value={values.fAfiliacion} onChange={handleChange('fAfiliacion')} error={errors.fAfiliacion} />

          <FormTextField label="Teléfono celular *" value={values.telefonoCelular} onChange={handleChange('telefonoCelular')} error={errors.telefonoCelular} keepLabel />
          <FormTextField label="Teléfono alterno *" value={values.otroTelefono} onChange={handleChange('otroTelefono')} error={errors.otroTelefono} keepLabel />
          <FormTextField
            select
            label="Interés *"
            value={values.interesId}
            onChange={handleChange('interesId')}
            error={selectErrors.interesId}
            SelectProps={{ IconComponent: ChevronDown }}
          >
            <option value="">Seleccione</option>
            {interests.map((interest) => (
              <option key={interest.id} value={interest.id}>{interest.descripcion}</option>
            ))}
          </FormTextField>

          <div className="md:col-span-2 xl:col-span-3">
            <FormTextField
              label="Dirección *"
              value={values.direccion}
              onChange={handleChange('direccion')}
              error={errors.direccion}
              multiline
              rows={4}
            />
          </div>

          <div className="md:col-span-2 xl:col-span-3">
            <FormTextField
              label="Reseña personal *"
              value={values.resenaPersonal}
              onChange={handleChange('resenaPersonal')}
              error={errors.resenaPersonal}
              multiline
              rows={4}
            />
          </div>
        </form>
      </PageSection>

      <ConfirmationDialog
        open={Boolean(submitError)}
        title="Error al guardar cliente"
        description={submitError}
        loading={false}
        onClose={() => setSubmitError('')}
        onConfirm={() => setSubmitError('')}
        confirmLabel="Cerrar"
        confirmColor="primary"
        hideCancel
      />
    </AppShell>
  );
}
