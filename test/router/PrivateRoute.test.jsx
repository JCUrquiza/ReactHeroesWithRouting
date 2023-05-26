import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';


describe('Pruebas en el <PrivateRoute/>', () => {

    test('Debe de mostrar el children si está autenticado', () => {

        // Obtener el localStorage
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan Carlos'
            }
        }

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>

                    <PrivateRoute>
                        <h1>Ruta Privada</h1>
                    </PrivateRoute>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta Privada') ).toBeTruthy();
        // Evaluar que el localStorage fue llamado
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');

    });

});


