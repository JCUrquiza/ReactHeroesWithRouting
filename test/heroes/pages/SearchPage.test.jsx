import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

// Mock:
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    // useNavigate: jest.fn(),
    useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

    // Limpiar los mocks:
    beforeEach( () => jest.clearAllMocks() );

    test('Debe de mostrarse correctamente con valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        // screen.debug();
        // expect( container ).toMatchSnapshot();

    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman']} >
                <SearchPage />
            </MemoryRouter>
        );
        // screen.debug();

        // Obtener el input:
        const input = screen.getByRole('textbox');
        // Asegurarnos de que el input contiene el valor del queryString
        expect( input.value ).toBe('batman');

        // Obtener el img
        const img = screen.getByRole('img');
        // Debe de mostrar la imágen de Batman (2 formas):
        // expect( img.src ).toBe('http://localhost/assets/heroes/dc-batman.jpg');
        expect( img.src ).toContain('assets/heroes/dc-batman.jpg');

        // Obtener el div del alert-danger
        const alert = screen.getByLabelText('alert-danger');
        // Esperar que el display muestre la propiedad none:
        expect( alert.style.display ).toBe('none');

    });

    test('Debe de mostrar un error si no se encuentra el hero (batman123)', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batman123']} >
                <SearchPage />
            </MemoryRouter>
        );

        // Obtener el div del alert-danger
        const alert = screen.getByLabelText('alert-danger');
        // Esperar que el display se muestre la propiedad display: ''
        expect( alert.style.display ).not.toBe('none');


    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {

        render(
            <MemoryRouter initialEntries={['/search']} >
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        
        // Debemos de ingresar valor al input:
        fireEvent.change(input, { target: { name: 'searchText', value: 'superman' } });
        // console.log(input.value);
        // screen.debug();
        const form = screen.getByLabelText('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith('?q=superman');

    });

});




