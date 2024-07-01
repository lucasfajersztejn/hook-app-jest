import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";


describe('Pruebas en <TodoItem />', () => {

  const todo = {
    id: 1,
    description: 'Piedra del Alma',
    done: false,
  };

  const onDeleteTodoMock = jest.fn();
  const onToggleTodoMock = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test('Debe de mostrar el Todo Pendiente de completar', () => {

    render( 
      <TodoItem 
        todo={ todo } 
        onToggleTodo={ onToggleTodoMock } 
        onDeleteTodo={ onDeleteTodoMock } 
      /> 
    );

    const liElement = screen.getByRole('listitem');
    // console.log(liElement.innerHTML)
    expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');
    
    const spanElement = screen.getByLabelText('span');
    // console.log(spanElement.className)
    expect( spanElement.className ).toContain('align-self-center'); // Pongo toContain porque en el componente en el className hay un espacio en blanco y de esta manera solo evalua si contiene la clase o no, no si es igual.
    expect( spanElement.className ).not.toContain('text-decoration-line-through');
  });
  
  test('Debe de mostrar el Todo completado', () => {

    todo.done = true;

    render( 
      <TodoItem 
        todo={ todo } 
        onToggleTodo={ onToggleTodoMock } 
        onDeleteTodo={ onDeleteTodoMock } 
      /> 
    );

    const spanElement = screen.getByLabelText('span');
    expect( spanElement.className ).toContain('text-decoration-line-through');
  });

  test('Span debe de llamar el ToggleTodo cuando se hace click', () => {

    render( 
      <TodoItem 
        todo={ todo } 
        onToggleTodo={ onToggleTodoMock } 
        onDeleteTodo={ onDeleteTodoMock } 
      /> 
    );

    const spanElement = screen.getByLabelText('span');
    fireEvent.click( spanElement );

    expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id )
    
  });

  test('Button debe de llamar el deleteTodo', () => {
    
    render( 
      <TodoItem 
        todo={ todo } 
        onToggleTodo={ onToggleTodoMock } 
        onDeleteTodo={ onDeleteTodoMock } 
      /> 
    );

    const buttonElement = screen.getByText('Borrar');
    // const buttonElement = screen.getByRole('button', { name: 'Borrar' });
    fireEvent.click( buttonElement );
    
    expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );
  });

});