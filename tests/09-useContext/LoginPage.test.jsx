import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from '../../src/09-useContext/LoginPage';
import { UserContext } from '../../src/09-useContext/context/UserContext';


describe('Pruebas en <LoginPage />', () => {

  const user = {
    id: 1,
    name: 'Lucas'
  }

  const setUserMock = jest.fn();

  test('Debe de mostrar el componente sin el usuario', () => {

    render( 
      <UserContext.Provider value={{ user: null }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const preTag = screen.getByLabelText('pre');
    expect( preTag.innerHTML ).toBe( 'null' );

  });
  
  test('Debe de llamar el setUser cuando se hace click en el boton', () => {

    render( 
      <UserContext.Provider value={{ user, setUser: setUserMock }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const buttonSetUser = screen.getByText('Set user');
    fireEvent.click( buttonSetUser )

    expect( setUserMock ).toHaveBeenCalledWith({ id: 123, name: 'Lucas Fajersztejn', email: 'lucas@google.com' });

  });

});