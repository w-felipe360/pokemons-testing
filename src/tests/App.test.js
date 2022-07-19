import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  const navi = screen.getAllByRole('navigation');
  expect(navi[0]).toBeInTheDocument();
});
it(`Teste se a aplicação é redirecionada para a página
 inicial, na URL / ao clicar no link Home da barra de navegação`, async () => {
  renderWithRouter(<App />);
  console.log(screen.logTestingPlaygroundURL());
  const next = await screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  const casa = await screen.findByText('Home');
  userEvent.click(casa);
  await expect(next).toBeInTheDocument();
});
it(`Teste se a aplicação é redirecionada para a página de About, na URL /about, 
ao clicar no link About da barra de navegação;`, async () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  const sobre = screen.getByRole('link', {
    name: /about/i,
  });
  userEvent.click(sobre);
  const casa = await screen.findByText('About Pokédex');
  expect(casa).toBeInTheDocument();
});
it(`Teste se a aplicação é redirecionada para a 
página de Pokémons Favoritados, na URL /favorites, 
ao clicar no link Favorite Pokémons da barra de navegação;`, async () => {
  renderWithRouter(<App />);
  const favoritos = await screen.getByRole('link', { name: /favorite pokémons/i });
  userEvent.click(favoritos);
  const favpok = screen.getByRole('heading', {
    name: /favorite pokémons/i,
  });
  expect(favpok).toBeInTheDocument();
});
it(`Teste se a aplicação é redirecionada para a página Not Found
 ao entrar em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/*');
  const favpok = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(favpok).toBeInTheDocument();
});
