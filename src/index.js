// src/index.js
import { Dex } from 'localdex';
import { getWeaknesses, getResistances } from './typeEffectiveness.js';
import { getRanking } from './ranking.js';

// 1. Read the command line arguments
const args = process.argv.slice(2);
const command = args[0];

if (!command) {
  console.log("Please provide a Pokémon name or the command 'ranking'.");
  console.log("Usage: npm start <pokemon_name>");
  console.log("Example: npm start garchomp");
  console.log("Usage: npm start ranking");
  process.exit(1);
}

// 2. If the user types 'ranking', show the type ranking
if (command.toLowerCase() === 'ranking') {
  console.log('\n=== TYPE RANKING ===');
  const ranking = getRanking();
  ranking.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.type} - Total: ${entry.total} (Off: ${entry.offensive}, Def: ${entry.defensive})`);
  });
} 
// 3. Otherwise, look up the mon
else {
  const pokemonName = command;
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
  } else {
    console.log(`Pokémon "${pokemonName}" not found.`);
  }
}