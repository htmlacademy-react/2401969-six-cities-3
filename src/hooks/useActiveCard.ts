import { useCallback, useMemo, useState } from 'react';
import { Location } from '../types/offers-types';

type useActiveCardProps = { id: string; location: Location }[];

type useActiveCardReturn = {
  activeLocation: Location | null;
  handleCardMouseEnter: (id: string) => void;
  handleCardMouseLeave: () => void;
}

function useActiveCard(cards: useActiveCardProps): useActiveCardReturn {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const activeLocation = useMemo(() => (
    activeOfferId
      ? cards.find((card) => card.id === activeOfferId)?.location ?? null
      : null
  ), [activeOfferId, cards]);

  const handleCardMouseEnter = useCallback((id: string) => {
    setActiveOfferId(id);
  },[]);

  const handleCardMouseLeave = useCallback(() => {
    setActiveOfferId(null);
  },[]);

  return {
    activeLocation,
    handleCardMouseEnter,
    handleCardMouseLeave,
  };
}

export { useActiveCard };
