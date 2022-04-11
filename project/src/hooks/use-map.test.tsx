import { renderHook } from '@testing-library/react-hooks';
import { Map } from 'leaflet';
import { makeFakeCity } from '../utils/mocks';
import useMap from './use-map';

const fakeCity = makeFakeCity();

describe('Hook: useMap', () => {
  it('should return Map', () => {
    const target = document.createElement('div');
    const fakeRef = {
      current: target,
    };

    const { result } = renderHook(() =>
      useMap(fakeRef, fakeCity),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Map);
  });

  it('should be correctly change state', () => {
    const target = document.createElement('div');
    const fakeRef = {
      current: target,
    };

    const expectedMap = null;

    const { result } = renderHook(() =>
      useMap(fakeRef, fakeCity),
    );

    const map = result.current;

    expect(map).not.toStrictEqual(expectedMap);
  });
});
