import { fireEvent, render, screen } from '@testing-library/react';
import { useFetch } from '../../src/hooks/useFetch';
import { Layout } from '../../src/05-useLayoutEffect/Layout';
import { useCounter } from '../../src/hooks/useCounter';
import { act } from 'react';

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {

  const mockIncrement = jest.fn();
  useCounter.mockReturnValue({
    counter: 1,
    increment: mockIncrement
  });

  beforeEach( () => {
    jest.clearAllMocks();
  });

  test('Debe de mostrar el componente por defecto', () => {

    useFetch.mockReturnValue({ 
      data: null, 
      isLoading: true, 
      hasError: null, 
    });

    render( <Layout /> );

    expect( screen.getByText('Loading...') );
    expect( screen.getByText('BreakingBad Quotes') );

    const nextButton = screen.getByRole('button', { name: 'Next quote' })
    expect(nextButton.disabled).toBeTruthy();
    // screen.debug();

  });

  test('Debe de mostrar un Quote', () => {

    useFetch.mockReturnValue({ 
      data: [{ author: 'Fernando', quote: 'Hola Mundo' }], 
      isLoading: false, 
      hasError: null, 
    });

    render( <Layout /> );
    expect( screen.getByText('Hola Mundo') ).toBeTruthy();
    expect( screen.getByText('Fernando') ).toBeTruthy();

    const nextButton = screen.getByRole('button', { name: 'Next quote' })
    expect(nextButton.disabled).toBeFalsy();
    
  });

  test('Debe de llamar la función de incrementar', () => {
    
    useFetch.mockReturnValue({ 
      data: [{ author: 'Fernando', quote: 'Hola Mundo' }], 
      isLoading: false, 
      hasError: null, 
    });

    render( <Layout /> );
    const nextButton = screen.getByRole('button', { name: 'Next quote' });
    fireEvent.click( nextButton );
 

    expect( mockIncrement ).toHaveBeenCalled();

  });

});