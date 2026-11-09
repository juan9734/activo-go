import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonBadge,
  IonImg,
  IonSpinner,
  IonText,
} from '@ionic/react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { activosRepository } from '../../../core/di/composicion';
import { useSesion } from '../../../core/sesion/SesionContext';

const COLOR_ESTADO: Record<string, string> = {
  ACTIVO: 'success',
  MANTENIMIENTO: 'warning',
  BAJA: 'danger',
};

export default function DetalleActivoPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario } = useSesion();

  const { data: activo, isLoading, isError } = useQuery({
    queryKey: ['activos', id],
    queryFn: () => activosRepository.obtener(id as string),
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activos" />
          </IonButtons>
          <IonTitle>{activo ? `${activo.codigo}` : 'Detalle del activo'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {isLoading && <IonSpinner />}

        {isError && !isLoading && (
          <IonText color="danger">
            <p>No se pudo cargar el activo.</p>
          </IonText>
        )}

        {activo && (
          <>
            <IonCard>
              <IonCardContent>
                {activo.fotoUrl && <IonImg src={activo.fotoUrl} className="ion-margin-bottom" />}

                <IonItem lines="none">
                  <IonLabel>
                    <h2>{activo.nombre}</h2>
                    <p>{activo.codigo}</p>
                  </IonLabel>
                  <IonBadge color={COLOR_ESTADO[activo.estado] ?? 'medium'}>{activo.estado}</IonBadge>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>
                    <p>Categoría</p>
                    <h3>{activo.categoria}</h3>
                  </IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>
                    <p>Ubicación</p>
                    <h3>{activo.ubicacion ?? 'Sin asignar'}</h3>
                  </IonLabel>
                </IonItem>

                <IonItem lines="none">
                  <IonLabel>
                    <p>Responsable</p>
                    <h3>{activo.responsable ?? 'Sin asignar'}</h3>
                  </IonLabel>
                </IonItem>

                {activo.estadoActualizadoEn && (
                  <IonItem lines="none">
                    <IonLabel>
                      <p>Último cambio de estado</p>
                      <h3>{new Date(activo.estadoActualizadoEn).toLocaleString()}</h3>
                    </IonLabel>
                  </IonItem>
                )}
              </IonCardContent>
            </IonCard>

            {usuario?.rol === 'ADMIN' && (
              <>
                <IonButton expand="block" onClick={() => navigate(`/activos/${activo.id}/editar`)}>
                  Editar
                </IonButton>
                <IonButton expand="block" fill="outline" onClick={() => navigate(`/activos/${activo.id}/foto`)}>
                  {activo.fotoUrl ? 'Repetir foto' : 'Tomar foto'}
                </IonButton>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
