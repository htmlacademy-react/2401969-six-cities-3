import { SortOption, SortOptions } from '../../const';
import { useState } from 'react';

type SortItemProps = {
  option: SortOption;
  isActive: boolean;
  onSelect: () => void;
}

function SortItem({ option, isActive, onSelect }: SortItemProps): JSX.Element {
  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={onSelect}
    >
      {option.value}
    </li>
  );
}

type PlacesSortingProps = {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
};

function PlacesSorting({ currentSort, onSortChange }: PlacesSortingProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {currentSort.value}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {SortOptions.map((item) => (
            <SortItem
              key={item.value}
              option={item}
              isActive={item.value === currentSort.value}
              onSelect={() => handleSelect(item)}
            />
          ))}
        </ul>
      )}
    </form>
  );
}

export { PlacesSorting };
