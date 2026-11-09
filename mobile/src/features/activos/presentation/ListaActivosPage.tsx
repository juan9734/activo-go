import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonSkeletonText,
  IonText,
  IonRefresher,
  IonRefresherContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonSpinner,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { useListaActivosViewModel } from './use-lista-activos-view-model';
import { useSesion } from '../../../core/sesion/SesionContext';
import { activosRepository } from '../../../core/di/composicion';

const COLOR_ESTADO: Record<string, string> = {
  ACTIVO: 'success',
  MANTENIMIENTO: 'warning',
  BAJA: 'danger',
};

export default function ListaActivosPage() {
  const { fase, activos, actualizadoEn } = useListaActivosViewModel();
  const { usuario, cerrarSesion } = useSesion();
  const navigate = useNavigate();
  const [exportando, setExportando] = useState(false);
  const [errorExportar, setErrorExportar] = useState(false);

  async function onCerrarSesion() {
    await cerrarSesion();
    navigate('/login', { replace: true });
  }

  async function onExportarCsv() {
    setErrorExportar(false);
    setExportando(true);
    try {
      const csv = await activosRepository.exportarCsv();
      const nombreArchivo = 'inventario-activogo.csv';
      const { uri } = await Filesystem.writeFile({
        path: nombreArchivo,
        data: csv,
        directory: Directory.Cache,
        encoding: Encoding.UTF8,
      });
      await Share.share({ title: nombreArchivo, url: uri, dialogTitle: 'Compartir inventario CSV' });
    } catch {
      setErrorExportar(true);
    } finally {
      setExportando(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Activos ({usuario?.rol ?? '—'})</IonTitle>
          <IonButtons slot="end">
            {(usuario?.rol === 'ADMIN' || usuario?.rol === 'AUDITOR') && (
              <IonButton onClick={() => navigate('/activos/escanear')}>Escanear</IonButton>
            )}
            {usuario?.rol === 'ADMIN' && (
              <IonButton onClick={onExportarCsv} disabled={exportando}>
                {exportando ? <IonSpinner name="dots" /> : 'CSV'}
              </IonButton>
            )}
            <IonButton onClick={onCerrarSesion}>Salir</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={(e) => e.detail.complete()}>
          <IonRefresherContent />
        </IonRefresher>

        {errorExportar && (
          <IonText color="danger" className="ion-padding">
            <p>No se pudo exportar el CSV.</p>
          </IonText>
        )}

        {fase === 'offline' && (
          <IonText color="medium" className="ion-padding">
            <p>
              Sin conexión
              {actualizadoEn ? ` — datos de ${actualizadoEn.toLocaleTimeString()}` : ''}
            </p>
          </IonText>
        )}

        {fase === 'cargando' && (
          <IonList>
            {[1, 2, 3, 4, 5].map((n) => (
              <IonItem key={n}>
                <IonLabel>
                  <IonSkeletonText animated style={{ width: '60%' }} />
                  <IonSkeletonText animated style={{ width: '40%' }} />
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        {fase === 'vacio' && (
          <IonText className="ion-padding">
            <p>Aún no hay activos.{usuario?.rol === 'ADMIN' ? ' Toca "+" para registrar el primero.' : ''}</p>
          </IonText>
        )}

        {(fase === 'cargado' || fase === 'offline') && activos.length > 0 && (
          <IonList>
            {activos.map((activo) => (
              <IonItem key={activo.id} button onClick={() => navigate(`/activos/${activo.id}`)}>
                <IonLabel>
                  <h2>
                    {activo.codigo} — {activo.nombre}
                  </h2>
                  <p>{activo.categoria}</p>
                </IonLabel>
                <IonBadge color={COLOR_ESTADO[activo.estado] ?? 'medium'}>{activo.estado}</IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}

        {usuario?.rol === 'ADMIN' && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={() => navigate('/activos/nuevo')} aria-label="Registrar nuevo activo">
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}
      </IonContent>
    </IonPage>
  );
}
