import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';


describe('Pruebas en <SearchPage />', () => {

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

        const {} = render(
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
        // Experar que el display muestre la propiedad none:
        expect( alert.style.display ).toBe('none');

    });

});


