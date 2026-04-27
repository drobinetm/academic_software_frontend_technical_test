import React, { useState } from 'react';
import { ArrowRight, UserRoundPlus } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components/common/ui/Button';
import { AuthLayout } from '../../components/layout/AuthLayout';
import { FormTextField } from '../../components/common/FormTextField';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../hooks/useAuth';
import { useFeedback } from '../../hooks/useFeedback';
import { getValidationErrors, registerSchema } from '../../utils/validators';

export function RegisterPage() {
  const history = useHistory();
  const { register } = useAuth();
  const { showFeedback } = useFeedback();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = getValidationErrors(registerSchema, values);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await register(values);
      showFeedback({ message: response?.message || 'Registro completado correctamente.', severity: 'success' });
      history.push(ROUTES.login);
    } catch (error) {
      showFeedback({ message: error.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Registro" subtitle="Crea una nueva cuenta del sistema con las reglas de seguridad requeridas." icon={UserRoundPlus} showShowcase={false}>
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormTextField label="Nombre de usuario *" name="username" value={values.username} onChange={handleChange('username')} error={errors.username} className="h-12 px-3.5" />
        <FormTextField label="Dirección de correo *" name="email" value={values.email} onChange={handleChange('email')} error={errors.email} className="h-12 px-3.5" />
        <FormTextField label="Contraseña *" name="password" type="password" value={values.password} onChange={handleChange('password')} error={errors.password} className="h-12 px-3.5" />

        <Button type="submit" size="lg" fullWidth disabled={loading} className="h-14 text-base">
          <ArrowRight className="h-5 w-5" />
          {loading ? 'Registrando...' : 'Registrarme'}
        </Button>

        <button type="button" onClick={() => history.push(ROUTES.login)} className="text-left text-sm leading-6 text-accent transition hover:text-accent-strong">
          Ya tienes una cuenta?
          <br />
          Inicia sesión
        </button>
      </form>
    </AuthLayout>
  );
}
