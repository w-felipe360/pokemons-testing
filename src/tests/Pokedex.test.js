import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

test(`se a página contém um heading h2 
com o texto Encountered pokémons`, () => {
  renderWithRouter(<App />);
  const heading2 = screen.getByRole('heading', {
    name: /encountered pokémons/i,
    level: 2,
  });
  //   console.log(screen.logTestingPlaygroundURL());

  expect(heading2).toBeInTheDocument();
});
test(`este se é exibido o próximo pokémon da
lista quando o botão Próximo pokémon é clicado:
`, () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  userEvent.click(nextButton);
  const pokemon = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(pokemon).toBeInTheDocument();
});
test('Teste se é mostrado apenas um pokémon por vez', () => {
  renderWithRouter(<App />);
  const pokemon = screen.getAllByRole('img', {
    name: /sprite/i,
  });
  expect(pokemon.length).toBe(1);
  expect(pokemon[0]).toBeInTheDocument();
});
test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);
  const botoes = screen.getAllByTestId('pokemon-type-button');
  botoes.forEach((botao) => {
    expect(botao).toBeInTheDocument();
  });
});

test(`Deve existir um botão de filtragem para cada 
tipo de pokémon, sem repetição`, () => {
  renderWithRouter(<App />);
  const filteredTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic',
    'Normal', 'Dragon'];
  filteredTypes.forEach((tipo) => {
    const selectype = screen.getByRole('button', {
      name: tipo,
    });
    expect(selectype).toBeInTheDocument();
  });
});
test(`A partir da seleção de um botão de tipo, a
  Pokédex deve circular somente pelos pokémons daquele tipo`, () => {
  renderWithRouter(<App />);
  const fireButton = screen.getByRole('button', {
    name: /fire/i,
  });
  userEvent.click(fireButton);
  const charmander = screen.getByRole('img', {
    name: /charmander sprite/i,
  });
  expect(charmander).toBeInTheDocument();
  const nextClick = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(nextClick);
  const rapidash = screen.getByRole('img', {
    name: /rapidash sprite/i,
  });
  expect(rapidash).toBeInTheDocument();
});
it('O texto do botão deve corresponder ao nome do tipo', () => {
  renderWithRouter(<App />);
  const botaoSelect = screen.getByRole('button', {
    name: /poison/i,
  });
  userEvent.click(botaoSelect);
  const tipoNaTela = screen.getByTestId('pokemon-type', {
    name: botaoSelect,
  });
  expect(tipoNaTela).toBeInTheDocument();
});

it('O botão All precisa estar sempre visível.', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', {
    name: /all/i,
  });
  expect(allButton).toBeInTheDocument();
});
it('O texto do botão deve ser All;', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', {
    name: /all/i,
  });
  expect(allButton).toHaveTextContent('All');
});
it(`A Pokedéx deverá mostrar os pokémons 
normalmente (sem filtros) quando o botão All for clicado`, () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', {
    name: /all/i,
  });
  const nextButton = screen.getByRole('button', {
    name: /próximo pokémon/i,
  });
  userEvent.click(allButton);
  pokemons.forEach((pokemon, index) => {
    const newPokemon = screen.getByText(pokemon.name);
    if (index === 0) { expect(newPokemon).toBeInTheDocument(); }
    userEvent.click(nextButton);
    expect(newPokemon).toBeInTheDocument();
  });
});
