// src/index.js
import { Dex } from 'localdex';
import { getWeaknesses, getResistances } from './typeEffectiveness.js';
import { getRanking } from './ranking.js';

// show the ranking of all types
console.log('\n=== TYPE RANKING ===');
const ranking = getRanking();
ranking.forEach((entry, index) => {
  console.log(`${index + 1}. ${entry.type} - Total: ${entry.total} (Off: ${entry.offensive}, Def: ${entry.defensive})`);
});

// Look up a mon
const pokemonName = 'Garchomp';
const pokemon = Dex.pokemon(pokemonName);

if (pokemon) {
  console.log(`\n--- ${pokemon.name} ---`);
  console.log(`Types: ${pokemon.types.join(' / ')}`);

  const weaknesses = getWeaknesses(pokemon.types);
  console.log('\nWeaknesses:');
  weaknesses.forEach(w => console.log(`  ${w.type} (${w.multiplier}x)`));

  const resistances = getResistances(pokemon.types);
  console.log('\nResistances/Immunities:');
  resistances.forEach(r => console.log(`  ${r.type} (${r.multiplier}x)`));
}