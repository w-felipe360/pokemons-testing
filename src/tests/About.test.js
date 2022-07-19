import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// console.log(screen.logTestingPlaygroundURL());

describe('Teste o componente <About.js />.', () => {
  test('se a página contém as informações sobre a Pokédex com h2;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const sobre = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(sobre).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const paragrafo1 = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia/i,
    );
    const paragrafo2 = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    const paragrafos = [paragrafo1, paragrafo2];

    paragrafos.forEach((paragrafo) => {
      expect(paragrafo).toBeInTheDocument();
    });
  });
  test(`Teste se a página contém a seguinte imagem de uma Pokédex:
  https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const imagem = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(imagem).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
