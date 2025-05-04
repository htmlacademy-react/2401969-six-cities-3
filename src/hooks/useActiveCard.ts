import { useState } from 'react';
import { Location } from '../mocks/mock-offers';

type useActiveCardProps = { id: string; location: Location }[];

type useActiveCardReturn = {
  activeOfferId: string | null;
  activeLocation: Location | null;
  handleCardMouseEnter: (id: string) => void;
  handleCardMouseLeave: () => void;
}

function useActiveCard(cards: useActiveCardProps): useActiveCardReturn {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const activeLocation = activeOfferId
    ? cards.find((card) => card.id === activeOfferId)?.location ?? null
    : null;

  const handleCardMouseEnter = (id: string) => {
    setActiveOfferId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveOfferId(null);
  };

  return {
    activeOfferId,
    activeLocation,
    handleCardMouseEnter,
    handleCardMouseLeave,
  };
}

export { useActiveCard };
