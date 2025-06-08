import { SortOption, SortOptions } from '../../const';
import { memo, useCallback, useState } from 'react';

type SortItemProps = {
  option: SortOption;
  isActive: boolean;
  onSelect: (option: SortOption) => void;
}

const SortItem = memo(({ option, isActive, onSelect }: SortItemProps): JSX.Element => {
  const handleClick = useCallback(() => onSelect(option), [onSelect, option]);

  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex={0}
      onClick={handleClick}
    >
      {option.value}
    </li>
  );
});

SortItem.displayName = 'SortItem';

type PlacesSortingProps = {
  currentSort: SortOption;
  onSortChange: (option: SortOption) => void;
};

const PlacesSorting = memo(({ currentSort, onSortChange }: PlacesSortingProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((prev) =>!prev);

  const handleSelect = useCallback((option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  }, [onSortChange]);

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
              onSelect={handleSelect}
            />
          ))}
        </ul>
      )}
    </form>
  );
});

PlacesSorting.displayName = 'PlacesSorting';

export { PlacesSorting };
