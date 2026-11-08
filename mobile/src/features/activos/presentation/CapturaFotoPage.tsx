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
  IonImg,
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { capturaFoto, activosRepository } from '../../../core/di/composicion';

type Fase = 'vacio' | 'cargando' | 'cargado' | 'error' | 'permiso-denegado';

export default function CapturaFotoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [fase, setFase] = useState<Fase>('vacio');
  const [fotoUrl, setFotoUrl] = useState<string | null>(null);

  const guardar = useMutation({
    mutationFn: (dataUrl: string) => activosRepository.actualizarFoto(id as string, dataUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activos'] });
      navigate(-1);
    },
  });

  async function onTomarFoto() {
    setFase('cargando');
    try {
      const dataUrl = await capturaFoto.tomarFoto();
      setFotoUrl(dataUrl);
      setFase('cargado');
    } catch {
      setFase('permiso-denegado');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activos" />
          </IonButtons>
          <IonTitle>Foto del activo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        {fase === 'vacio' && (
          <IonButton expand="block" onClick={onTomarFoto}>
            Tomar foto
          </IonButton>
        )}

        {fase === 'cargando' && <IonSpinner />}

        {fase === 'permiso-denegado' && (
          <>
            <IonText color="danger">
              <p>ActivoGo necesita la cámara para fotografiar el activo. Revisa los permisos en Ajustes.</p>
            </IonText>
            <IonButton fill="outline" onClick={() => navigate(-1)}>
              Continuar sin foto
            </IonButton>
          </>
        )}

        {fase === 'cargado' && fotoUrl && (
          <>
            <IonImg src={fotoUrl} />
            <IonButton
              expand="block"
              className="ion-margin-top"
              disabled={guardar.isPending}
              onClick={() => guardar.mutate(fotoUrl)}
            >
              {guardar.isPending ? <IonSpinner name="dots" /> : 'Guardar'}
            </IonButton>
            <IonButton fill="clear" onClick={onTomarFoto}>
              Repetir
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
