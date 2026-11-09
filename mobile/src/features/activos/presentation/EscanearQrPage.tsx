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
  IonText,
  IonSpinner,
} from '@ionic/react';
import { useNavigate } from 'react-router-dom';
import { escanerQr, activosRepository } from '../../../core/di/composicion';

type Fase = 'vacio' | 'escaneando' | 'no-encontrado' | 'error' | 'permiso-denegado';

export default function EscanearQrPage() {
  const navigate = useNavigate();
  const [fase, setFase] = useState<Fase>('vacio');
  const [codigoNoEncontrado, setCodigoNoEncontrado] = useState('');

  async function onEscanear() {
    setFase('escaneando');
    try {
      const codigo = await escanerQr.escanear();
      if (!codigo) {
        setFase('vacio');
        return;
      }
      const activos = await activosRepository.listar();
      const activo = activos.find((a) => a.codigo === codigo);
      if (activo) {
        navigate(`/activos/${activo.id}`, { replace: true });
      } else {
        setCodigoNoEncontrado(codigo);
        setFase('no-encontrado');
      }
    } catch (err) {
      const tienePermiso = (err as { tipo?: string })?.tipo !== 'permiso-denegado';
      setFase(tienePermiso ? 'error' : 'permiso-denegado');
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/activos" />
          </IonButtons>
          <IonTitle>Escanear QR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        {fase === 'vacio' && (
          <IonButton expand="block" onClick={onEscanear}>
            Escanear código QR
          </IonButton>
        )}

        {fase === 'escaneando' && <IonSpinner />}

        {fase === 'permiso-denegado' && (
          <>
            <IonText color="danger">
              <p>ActivoGo necesita la cámara para escanear el código. Revisa los permisos en Ajustes.</p>
            </IonText>
            <IonButton fill="outline" onClick={() => navigate('/activos')}>
              Volver
            </IonButton>
          </>
        )}

        {fase === 'no-encontrado' && (
          <>
            <IonText color="danger">
              <p>No existe ningún activo con el código "{codigoNoEncontrado}".</p>
            </IonText>
            <IonButton expand="block" onClick={onEscanear}>
              Escanear otro
            </IonButton>
          </>
        )}

        {fase === 'error' && (
          <>
            <IonText color="danger">
              <p>No se pudo escanear el código.</p>
            </IonText>
            <IonButton expand="block" onClick={onEscanear}>
              Reintentar
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}
