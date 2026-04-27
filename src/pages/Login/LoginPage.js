import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { FormTextField } from '../../components/common/FormTextField';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import { getValidationErrors, loginSchema } from '../../utils/validators';

export function LoginPage() {
  const history = useHistory();
  const { login, getRememberedUsername } = useAuth();
  const { showFeedback } = useFeedback();
  const rememberedUsername = useMemo(() => getRememberedUsername(), [getRememberedUsername]);
  const [values, setValues] = useState({
    username: rememberedUsername,
    password: '',
    rememberMe: Boolean(rememberedUsername),
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => () => {
    isMountedRef.current = false;
  }, []);

  const handleChange = (field) => (event) => {
    const nextValue = field === 'rememberMe' ? event.target.checked : event.target.value;
    setValues((current) => ({
      ...current,
      [field]: nextValue,
    }));
    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(loginSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      await login(values);
      if (!isMountedRef.current) {
        return;
      }
      showFeedback({ message: 'Inicio de sesión completado correctamente.', severity: 'success' });
      history.push(ROUTES.home);
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }
      showFeedback({ message: error.message, severity: 'error' });
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <AuthLayout title="Iniciar sesión" subtitle="Usa tu cuenta registrada para acceder al panel de gestión de clientes." showShowcase={false}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormTextField label="Usuario *" name="username" value={values.username} onChange={handleChange('username')} error={errors.username} className="h-12 px-3.5" />

        <FormTextField
          label="Contraseña *"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={values.password}
          onChange={handleChange('password')}
          error={errors.password}
          className="h-12 px-3.5"
          endAdornment={(
            <button type="button" onClick={() => setShowPassword((current) => !current)} className="rounded-full p-1 text-text-muted transition hover:bg-surface-muted hover:text-text-primary" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        />

        <label className="flex items-center gap-3 text-sm text-text-secondary">
          <input type="checkbox" checked={values.rememberMe} onChange={handleChange('rememberMe')} className="h-4 w-4 rounded border-border text-accent focus:ring-accent/30" />
          Recordarme
        </label>

        <Button type="submit" size="lg" fullWidth disabled={loading} className="h-16 text-base">
          <LogIn className="h-5 w-5" />
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>

        <button type="button" onClick={() => history.push(ROUTES.register)} className="text-left text-sm leading-6 text-accent transition hover:text-accent-strong">
          No tienes una cuenta?
          <br />
          Regístrate
        </button>
      </form>
    </AuthLayout>
  );
}
