import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useLoginViewModel } from './use-login-view-model';
import { useSesion } from '../../../core/sesion/SesionContext';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@activogo.co');
  const [password, setPassword] = useState('');
  const { fase, mensajeError, enviar } = useLoginViewModel();
  const { usuario } = useSesion();
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) navigate('/activos', { replace: true });
  }, [usuario, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await enviar(email, password);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ActivoGo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={onSubmit}>
          <IonInput
            aria-label="Usuario"
            label="Usuario"
            labelPlacement="stacked"
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? '')}
            required
          />
          <IonInput
            aria-label="Contraseña"
            label="Contraseña"
            labelPlacement="stacked"
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? '')}
            required
          />
          {mensajeError && (
            <IonText color="danger">
              <p>{mensajeError}</p>
            </IonText>
          )}
          <IonButton
            expand="block"
            type="submit"
            disabled={fase === 'enviando' || fase === 'bloqueado'}
            className="ion-margin-top"
          >
            {fase === 'enviando' ? <IonSpinner name="dots" /> : 'Ingresar'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
