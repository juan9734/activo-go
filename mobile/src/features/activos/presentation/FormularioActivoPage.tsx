import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { activosRepository } from '../../../core/di/composicion';

export default function FormularioActivoPage() {
  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const crear = useMutation({
    mutationFn: () => activosRepository.crear({ codigo, nombre, categoria }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activos'] });
      navigate('/activos', { replace: true });
    },
    onError: (err) => {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        setMensajeError('Ya existe un activo con ese código');
      } else if (axios.isAxiosError(err) && !err.response) {
        setMensajeError('Necesitas conexión para guardar');
      } else {
        setMensajeError('No se pudo guardar el activo');
      }
    },
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMensajeError(null);
    crear.mutate();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activos" />
          </IonButtons>
          <IonTitle>Nuevo activo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={onSubmit}>
          <IonInput
            aria-label="Código"
            label="Código"
            labelPlacement="stacked"
            placeholder="ACT-011"
            value={codigo}
            onIonInput={(e) => setCodigo(e.detail.value ?? '')}
            required
          />
          <IonInput
            aria-label="Nombre"
            label="Nombre"
            labelPlacement="stacked"
            value={nombre}
            onIonInput={(e) => setNombre(e.detail.value ?? '')}
            required
            minlength={3}
          />
          <IonInput
            aria-label="Categoría"
            label="Categoría"
            labelPlacement="stacked"
            placeholder="Cómputo, Mobiliario, Redes…"
            value={categoria}
            onIonInput={(e) => setCategoria(e.detail.value ?? '')}
            required
          />
          {mensajeError && (
            <IonText color="danger">
              <p>{mensajeError}</p>
            </IonText>
          )}
          <IonButton expand="block" type="submit" disabled={crear.isPending} className="ion-margin-top">
            {crear.isPending ? <IonSpinner name="dots" /> : 'Guardar'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
