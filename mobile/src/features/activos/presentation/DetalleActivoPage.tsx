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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { activosRepository } from '../../../core/di/composicion';
import { useSesion } from '../../../core/sesion/SesionContext';
import type { EstadoActivo } from '../domain/activo';

const COLOR_ESTADO: Record<string, string> = {
  ACTIVO: 'success',
  MANTENIMIENTO: 'warning',
  BAJA: 'danger',
};

// Debe coincidir con TRANSICIONES_VALIDAS en api/src/services/activo.service.ts
const TRANSICIONES_VALIDAS: Record<EstadoActivo, EstadoActivo[]> = {
  ACTIVO: ['MANTENIMIENTO', 'BAJA'],
  MANTENIMIENTO: ['ACTIVO', 'BAJA'],
  BAJA: [],
};

export default function DetalleActivoPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { usuario } = useSesion();
  const queryClient = useQueryClient();

  const {
    data: activo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['activos', id],
    queryFn: () => activosRepository.obtener(id as string),
  });

  const cambiarEstado = useMutation({
    mutationFn: (estado: EstadoActivo) => activosRepository.cambiarEstado(id as string, estado),
    onSuccess: (activoActualizado) => {
      queryClient.setQueryData(['activos', id], activoActualizado);
      queryClient.invalidateQueries({ queryKey: ['activos'] });
    },
  });

  function onCambiarEstado(estado: EstadoActivo) {
    if (estado === 'BAJA' && !window.confirm('Dar de baja es irreversible. ¿Continuar?')) return;
    cambiarEstado.mutate(estado);
  }

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

                {TRANSICIONES_VALIDAS[activo.estado].length > 0 && (
                  <div className="ion-margin-top">
                    <IonText color="medium">
                      <p>Cambiar estado a:</p>
                    </IonText>
                    {TRANSICIONES_VALIDAS[activo.estado].map((destino) => (
                      <IonButton
                        key={destino}
                        expand="block"
                        fill="outline"
                        color={COLOR_ESTADO[destino]}
                        disabled={cambiarEstado.isPending}
                        onClick={() => onCambiarEstado(destino)}
                      >
                        {destino}
                      </IonButton>
                    ))}
                  </div>
                )}

                {cambiarEstado.isError && (
                  <IonText color="danger">
                    <p>No se pudo cambiar el estado.</p>
                  </IonText>
                )}
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
