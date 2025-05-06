import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../mocks/mock-offers';

const setCityName = createAction<CityName>('city/setCityName');

export { setCityName };
