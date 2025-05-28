import { useParams } from 'react-router-dom';
import { useAppSelector, useOffersActions } from '../store/hooks';
import { CityName } from '../types/offers-types';
import { useEffect } from 'react';
import { offersSelectors } from '../store/slices/offers-slice';


function useCityName(): CityName {
  const cityName = useAppSelector(offersSelectors.cityName);
  const { city: urlCity } = useParams<{ city?: CityName}>();
  const { setCityName } = useOffersActions();

  useEffect(() => {
    if (urlCity && urlCity !== cityName) {
      setCityName(urlCity);
    }
  }, [urlCity, cityName, setCityName]);

  return cityName;
}

export { useCityName };
