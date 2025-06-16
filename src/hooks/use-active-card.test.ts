import { renderHook, act } from '@testing-library/react';
import { useActiveCard } from './use-active-card';

describe('useActiveCard', () => {
  const cards = [
    { id: '1', location: { latitude: 59.9343, longitude: 30.3351, zoom: 10} }, // Пример местоположения
    { id: '2', location: { latitude: 59.9343, longitude: 30.3352, zoom: 10 } },
    { id: '3', location: { latitude: 59.9343, longitude: 30.3353, zoom: 10 } },
  ];

  it('should return null for activeLocation initially', () => {
    const { result } = renderHook(() => useActiveCard(cards));
    expect(result.current.activeLocation).toBeNull();
  });

  it('should set activeLocation on mouse enter', () => {
    const { result } = renderHook(() => useActiveCard(cards));

    act(() => {
      result.current.handleCardMouseEnter('1');
    });

    expect(result.current.activeLocation).toEqual(cards[0].location);
  });

  it('should reset activeLocation on mouse leave', () => {
    const { result } = renderHook(() => useActiveCard(cards));

    act(() => {
      result.current.handleCardMouseEnter('1');
    });

    expect(result.current.activeLocation).toEqual(cards[0].location);

    act(() => {
      result.current.handleCardMouseLeave();
    });

    expect(result.current.activeLocation).toBeNull();
  });

  it('should update activeLocation when hovering over different cards', () => {
    const { result } = renderHook(() => useActiveCard(cards));

    act(() => {
      result.current.handleCardMouseEnter('2');
    });

    expect(result.current.activeLocation).toEqual(cards[1].location);

    act(() => {
      result.current.handleCardMouseEnter('3');
    });

    expect(result.current.activeLocation).toEqual(cards[2].location);
  });
});
