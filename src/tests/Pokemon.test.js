import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import { Pokemon } from '../components';

test('se o nome correto do pokémon deve ser mostrado na tela;', () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  const pokemonName = screen.getByTestId('pokemon-name');
  expect(pokemonName).toBeInTheDocument();
});
test('O tipo correto do pokémon deve ser mostrado na tela;', () => {
  renderWithRouter(<App />);
  console.log(screen.logTestingPlaygroundURL());
  const pokemonType = screen.getAllByText('Electric');
  expect(pokemonType[1]).toBeInTheDocument();
});
test(`O peso médio do pokémon deve ser exibido com um texto no formato 
 Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,
 respectivamente, o peso médio do 
 pokémon e sua unidade de medida;`, () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  pokemons.forEach((pokemon) => {
    const pesoReal = screen.getByTestId('pokemon-weight', {
      text: `Average weight: ${pokemon.averageWeight.value} 
      ${pokemon.averageWeight.measurementUnit}`,
    });
    // const peso = screen.getAllByText(pokemon.averageWeight.value);
    // const unidade = screen.getAllByText(pokemon.averageWeight.measurementUnit);
    // console.log(peso);
    expect(pesoReal).toBeInTheDocument();
    // expect(unidade).toBeInTheDocument();
  });
});

test(`A imagem do pokémon deve ser exibida. Ela deve conter
  um atributo src com a URL da imagem e um atributo alt com
  o texto <name> sprite, onde <name> é o nome do pokémon.`, () => {
  renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite={ false } />);
  //   console.log(screen.logTestingPlaygroundURL());
  const pikachu = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });
  expect(pikachu.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pikachu.alt).toBe('Pikachu sprite');
});
test(`Teste se o card do pokémon indicado na 
  Pokédex contém um link de navegação para exibir detalhes deste pokémon. O link
  deve possuir a URL /pokemons/<id>, onde <id> é 
  o id do pokémon exibido;`, () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  const detalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(detalhes.href).toBe('http://localhost/pokemons/25');
});
test(`Teste se ao clicar no link de navegação do pokémon, é feito 
  o redirecionamento da aplicação para a página de detalhes de pokémon;`, () => {
  renderWithRouter(<App />);
  //   console.log(screen.logTestingPlaygroundURL());
  const detalhes = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(detalhes);
  const locations = screen.getByRole('heading', {
    name: /game locations of/i,
  });
  expect(locations).toBeInTheDocument();
});
test(`O ícone deve ser uma imagem com 
  o atributo src contendo o caminho /star-icon.svg`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');
  const star1 = screen.getByRole('checkbox', {
    name: /pokémon favoritado\?/i,
  });
  userEvent.click(star1);
  const estrela = screen.getByRole('img', {
    name: /Pikachu is marked as favorite/i,
  });
  expect(estrela.src).toBe('http://localhost/star-icon.svg');
  expect(estrela.alt).toBe('Pikachu is marked as favorite');
});
