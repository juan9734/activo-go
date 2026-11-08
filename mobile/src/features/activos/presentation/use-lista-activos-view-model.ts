import { useQuery } from '@tanstack/react-query';
import { activosRepository } from '../../../core/di/composicion';

export function useListaActivosViewModel() {
  const { data, isLoading, isError, dataUpdatedAt, isFetching } = useQuery({
    queryKey: ['activos'],
    queryFn: () => activosRepository.listar(),
    staleTime: 1000 * 60, // 1 minuto: evita refetch agresivo al volver de /activos/foto
  });

  const sinRed = isError && data === undefined;
  const fase = isLoading
    ? 'cargando'
    : sinRed
      ? 'offline'
      : data && data.length === 0
        ? 'vacio'
        : 'cargado';

  return {
    fase: fase as 'cargando' | 'cargado' | 'vacio' | 'offline',
    activos: data ?? [],
    actualizadoEn: dataUpdatedAt ? new Date(dataUpdatedAt) : null,
    refrescando: isFetching,
  };
}
