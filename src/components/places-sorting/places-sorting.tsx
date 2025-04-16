import { SortOption, SortOptions } from '../../const';

type SortItemProps = SortOption;

function SortItem({ value, isActive }:SortItemProps): JSX.Element {
  return (
    <li className={`places__option ${isActive && ('places__option--active')}`} tabIndex={0}>{value}</li>
  );
}

function PlacesSorting(): JSX.Element {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}>
                  Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className="places__options places__options--custom places__options--opened">
        {SortOptions.map((item) => (
          <SortItem
            key={item.value}
            value={item.value}
            isActive={item.isActive}
          />
        ))}
      </ul>
    </form>
  );
}

export { PlacesSorting };
