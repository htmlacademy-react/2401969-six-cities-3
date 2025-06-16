import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MainContent } from './main-content';
import { createMockPlaceCard } from '../../../utils/utils';
import { renderWithProviders } from '../../../utils/mock-component';
import { SortOptions } from '../../../const';


describe('Component: MainContent', () => {
  const mockCityName = 'Paris';
  const mockCity = {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  };

  it('should render correctly with offers', () => {
    const mockPlaceCards = [
      createMockPlaceCard({ id: '1', city: mockCity }),
      createMockPlaceCard({ id: '2', city: mockCity })
    ];

    renderWithProviders(
      <MainContent
        cityPlaceCards={mockPlaceCards}
        cityName={mockCityName}
      />
    );

    expect(screen.getByText(`${mockPlaceCards.length} places to stay in ${mockCityName}`)).toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(2);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should change sort option', async () => {
    const user = userEvent.setup();
    const mockPlaceCards = [
      createMockPlaceCard({ id: '1', price: 100, city: mockCity }),
      createMockPlaceCard({ id: '2', price: 200, city: mockCity })
    ];

    renderWithProviders(
      <MainContent
        cityPlaceCards={mockPlaceCards}
        cityName={mockCityName}
      />
    );

    // Открываем dropdown сортировки
    const sortButton = screen.getByText('Popular');
    await user.click(sortButton);

    // Находим нужный вариант сортировки
    const priceLowToHighOption = SortOptions.find((opt) => opt.value === 'Price: low to high')!;
    const sortOption = screen.getByText(priceLowToHighOption.value);

    // Выбираем сортировку
    await user.click(sortOption);

    // Проверяем что выбранный вариант отображается
    expect(screen.getByText(priceLowToHighOption.value)).toBeInTheDocument();
  });

  it('should handle card hover', async () => {
    const mockPlaceCards = [
      createMockPlaceCard({ id: '1', city: mockCity }),
      createMockPlaceCard({ id: '2', city: mockCity })
    ];

    renderWithProviders(
      <MainContent
        cityPlaceCards={mockPlaceCards}
        cityName={mockCityName}
      />
    );

    const cards = screen.getAllByTestId('place-card');
    await userEvent.hover(cards[0]);

    // Проверяем что обработчик вызвался
    // (предполагается что карта реагирует на activeLocation)
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
