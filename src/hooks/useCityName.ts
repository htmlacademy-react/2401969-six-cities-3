import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectCityName } from '../store/selectors';
import { CityName } from '../types/offers-types';
import { useEffect } from 'react';
import { setCityName } from '../store/offers-slice';


function useCityName(): CityName {
  const cityName = useAppSelector(selectCityName);
  const { city: urlCity } = useParams<{ city?: CityName}>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (urlCity && urlCity !== cityName) {
      dispatch(setCityName(urlCity));
    }
  }, [urlCity, cityName, dispatch]);

  return cityName;
}

export { useCityName };
