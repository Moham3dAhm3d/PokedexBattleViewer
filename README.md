# Pokedex Battle Viewer

A Pokedex that focuses on the battle side of Pokemon, including type matchups and rankings.

## Features

- Look up Pokemon by name
- View full type matchups (offensive and defensive)
- Ranking of all 18 types based on their offensive and defensive scores
- Clear overview of weaknesses, resistances, and immunities

## Installation

```bash
npm install
```

## Usage

Once you have installed the project, you can use it directly from your terminal.

### Look up a Pokemon

To see the types, weaknesses, and resistances of a specific Pokemon, run:

```bash
npm start <pokemon_name>
```

**Example:**

```bash
npm start groudon
```

**Output:**

```
--- Groudon ---
Types: Ground

Weaknesses:
  Grass (2x)
  Ice (2x)
  Water (2x)

Resistances/Immunities:
  Electric (0x)
  Poison (0.5x)
  Rock (0.5x)
```

### View the Type Ranking

To see the ranking of all 18 types based on their battle effectiveness, run:

```bash
npm start ranking
```

## Ranking Methodology

The type ranking in this project is calculated based purely on type matchups. It does not take into account base stats, moves, or abilities. The goal is to provide a theoretical overview of how strong each type is in battle

### A Note on the Total Score

In this project, the Defensive Score represents the average damage a type _takes_. This means a **lower** Defensive Score is actually better

To make the ranking intuitive (where a higher Total Score is always better), we invert the Defensive Score before adding it to the Offensive Score:

`Total = Offensive + (2 - Defensive)`

This ensures that types with strong defensive properties (like Steel) are rewarded, and types with many weaknesses (like Ice) are penalized

### How the Scores are Calculated

For each of the 18 Pokémon types, we calculate three scores:

1. **Offensive Score (Off)**
   - This is the average damage multiplier when this type attacks all other 17 types.
   - A higher score means the type is generally more effective at dealing damage.
   - _Example:_ If a type has an Offensive Score of 1.2, it means on average it deals 1.2x damage against the entire type chart.

2. **Defensive Score (Def)**
   - This is the average damage multiplier this type receives when attacked by all other 17 types.
   - A **lower** score is better here, because it means the type takes less damage on average.
   - _Example:_ If a type has a Defensive Score of 0.8, it means on average it takes 0.8x damage from the entire type chart.

3. **Total Score (Total)**
   - Because a lower Defensive Score is better, we invert it before adding it to the Offensive Score.
   - The formula is: `Total = Offensive + (2 - Defensive)`
   - Types are ranked from highest to lowest Total Score.

### Example: Ground Type

Let's look at the **Ground** type to understand how the math works:

- **Offensive Score (Off: 0.611):** Ground is super effective (2x) against 5 types, not very effective (0.5x) against 2 types, and has no effect (0x) against 1 type (Flying). The average of these multipliers across all 18 types is 0.611.
- **Defensive Score (Def: 0.389):** Ground is weak (2x) to 3 types, resists (0.5x) 2 types, and is immune (0x) to 1 type (Electric). The average of these multipliers is 0.389.
- **Inverted Defensive Score:** 2 - 0.389 = 1.611
- **Total Score:** 0.611 + 1.611 = **2.222**.

This ranking is meant as a fun, theoretical starting point for competitive analysis, not as a definitive tier list.

## Sources

- [PokéAPI](https://pokeapi.co/)
- [localdex](https://www.npmjs.com/package/localdex)

## License

MIT
