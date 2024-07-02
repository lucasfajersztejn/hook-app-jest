import { render, screen } from '@testing-library/react';
import { HomePage } from '../../src/09-useContext/HomePage';
import { UserContext } from '../../src/09-useContext/context/UserContext';


describe('Pruebas en <HomePage />', () => {

  const user = {
    id: 1,
    name: 'Lucas'
  }

  test('Debe de mostrar el componente sin el usuario', () => {

    render( 
      <UserContext.Provider value={{ user: null }}>
        <HomePage />
      </UserContext.Provider>
    );
    
    const preTag = screen.getByLabelText('pre');
    expect( preTag.innerHTML ).toBe( 'null' );

    // screen.debug();
  });

  test('Debe de mostrar el componente CON el usuario', () => {

    render( 
      <UserContext.Provider value={{ user }}>
        <HomePage />
      </UserContext.Provider>
    );
    
    const preTag = screen.getByLabelText('pre');
    console.log(preTag.innerHTML) 
    expect( preTag.innerHTML ).toContain( '"id": 1' );
    expect( preTag.innerHTML ).toBe( JSON.stringify(user, null, 3) );

    // screen.debug();
  });

});