import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

// Mock:
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    // useNavigate: jest.fn(),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            id: 1,
            name: 'Juan Carlos'
        },
        logout: jest.fn()
    }

    // Limpiar los mocks
    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        // screen.debug();
        // Tiene que existir Juan Calos en el componente:
        expect( screen.getByText('Juan Carlos') ).toBeTruthy();

    });

    test('Debe de llamar el logout y navigate cuando se hace click en el botón de logout', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        // Evento click:
        fireEvent.click(logoutBtn);

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", { "replace": true });
         

    });

});


