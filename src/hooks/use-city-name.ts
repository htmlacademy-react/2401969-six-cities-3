import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useOffersActions } from '../store/hooks';
import { CityName } from '../types/offers-types';
import { useEffect, useMemo } from 'react';
import { offersSelectors } from '../store/slices/offers-slice';
import { CITIES } from '../const';


function useCityName(): CityName {
  const cityName = useAppSelector(offersSelectors.cityName);
  const { city: urlCity } = useParams<{ city?: CityName}>();
  const { setCityName } = useOffersActions();
  const navigate = useNavigate();

  useEffect(() => {
    if (urlCity) {
      if(CITIES.includes(urlCity)) {
        setCityName(urlCity);
      } else {
        navigate('*', { replace: true });
      }
    }
  }, [urlCity, cityName, setCityName, navigate]);

  return useMemo(() => urlCity || cityName, [urlCity, cityName]);
}

export { useCityName };
