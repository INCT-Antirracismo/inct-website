'use client';
import { Button } from '@/components/ui/button';
import { PointField, useField, useWatchForm } from '@payloadcms/ui';
import type { PointFieldClientComponent } from 'payload';
import { useCallback, useEffect } from 'react';
import MapWithAutocomplete from './MapWithAutocomplete';

export const LocationField: PointFieldClientComponent = (props) => {
  const { field, path } = props;
  const { value, setValue } = useField({ path });

  // @ts-ignore
  const handleChange = (place) => {
    setValue([place.lng, place.lat]);
  };
  return (
    <div className="">
      <p className="opacity-80 mb-2">
        Busque o lugar no campo abaixo ou mova o marcador no mapa.
      </p>
      <MapWithAutocomplete
        // @ts-ignore
        lat={value ? value[1] : 0}
        // @ts-ignore
        lng={value ? value[0] : 0}
        handleChange={handleChange}
      />
      <PointField {...props} />
    </div>
  );
};
