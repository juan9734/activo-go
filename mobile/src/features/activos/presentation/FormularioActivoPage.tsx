import { useEffect, useRef, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { activosRepository } from '../../../core/di/composicion';

export default function FormularioActivoPage() {
  const { id } = useParams<{ id: string }>();
  const esEdicion = Boolean(id);

  const [codigo, setCodigo] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: activoExistente } = useQuery({
    queryKey: ['activos', id],
    queryFn: () => activosRepository.obtener(id as string),
    enabled: esEdicion,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Precarga el formulario una sola vez cuando llegan los datos; no debe
  // volver a ejecutarse si TanStack Query revalida en segundo plano,
  // porque pisaría lo que el usuario ya escribió.
  const precargado = useRef(false);
  useEffect(() => {
    if (activoExistente && !precargado.current) {
      precargado.current = true;
      setCodigo(activoExistente.codigo);
      setNombre(activoExistente.nombre);
      setCategoria(activoExistente.categoria);
      setUbicacion(activoExistente.ubicacion ?? '');
    }
  }, [activoExistente]);

  const guardar = useMutation({
    mutationFn: () =>
      esEdicion
        ? activosRepository.actualizar(id as string, { nombre, categoria, ubicacion: ubicacion || undefined })
        : activosRepository.crear({ codigo, nombre, categoria, ubicacion: ubicacion || undefined }),
    onSuccess: (activo) => {
      queryClient.invalidateQueries({ queryKey: ['activos'] });
      navigate(esEdicion ? `/activos/${activo.id}` : '/activos', { replace: true });
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
    guardar.mutate();
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activos" />
          </IonButtons>
          <IonTitle>{esEdicion ? 'Editar activo' : 'Nuevo activo'}</IonTitle>
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
            readonly={esEdicion}
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
          <IonInput
            aria-label="Ubicación"
            label="Ubicación (opcional)"
            labelPlacement="stacked"
            placeholder="Piso 2, Bodega, Oficina 301…"
            value={ubicacion}
            onIonInput={(e) => setUbicacion(e.detail.value ?? '')}
          />
          {mensajeError && (
            <IonText color="danger">
              <p>{mensajeError}</p>
            </IonText>
          )}
          <IonButton expand="block" type="submit" disabled={guardar.isPending} className="ion-margin-top">
            {guardar.isPending ? <IonSpinner name="dots" /> : 'Guardar'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
