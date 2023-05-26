import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/router/AppRouter';

 
describe('Pruebas en <AppRoute />', () => {

    test('Debe de mostrar el login si no está autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getAllByText('Login').length ).toBe(1);

    });

    test('Debe de mostrar el componente de Marvel si está autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                name: 'Juan Carlos',
                id: '123ABC'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue } >
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        // screen.debug();
        // La palabra Marvel tiene que aparecer más de una vez
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

    });

});



