import { render } from '@testing-library/react';
import { PrivateRoute } from './private-route';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('PrivateRoute Component', () => {
  it('should render children when condition is true', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivateRoute condition navigateUrl="/login">
          <div>Protected Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to navigateUrl when condition is false', () => {
    const TestComponent = () => (
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <PrivateRoute condition={false} navigateUrl="/login">
                <div>Protected Content</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const { getByText } = render(<TestComponent />);

    expect(getByText('Login Page')).toBeInTheDocument();
    expect(() => getByText('Protected Content')).toThrow();
  });
});
