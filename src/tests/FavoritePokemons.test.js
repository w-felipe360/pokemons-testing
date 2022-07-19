import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test(`se é exibida na tela a mensagem No favorite 
pokemon found, caso a pessoa não tenha pokémons favoritos`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const notFound = screen.getByText(/no favorite pokemon found/i);
  expect(notFound).toBeInTheDocument();
});
