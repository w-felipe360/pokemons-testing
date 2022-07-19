import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test(`se a página contém um heading h2 com o texto Page 
requested not found 😭`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/*');
  const notFound = screen.getByRole('heading', {
    name: /page requested not/i,
  });
  expect(notFound);
});
test(`Teste se a página mostra a imagem 
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/*');
  const pikachu = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(pikachu).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
