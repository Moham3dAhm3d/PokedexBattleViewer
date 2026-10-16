// src/typeEffectiveness.js

// Full type chart (attacking type -> defending type)
// 0 = no effect, 0.5 = not very effective, 1 = normal, 2 = super effective
export const typeChart = {
  Normal:   { Rock: 0.5, Ghost: 0, Steel: 0.5 },
  Fire:     { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 2, Bug: 2, Rock: 0.5, Dragon: 0.5, Steel: 2 },
  Water:    { Fire: 2, Water: 0.5, Grass: 0.5, Ground: 2, Rock: 2, Dragon: 0.5 },
  Electric: { Water: 2, Electric: 0.5, Grass: 0.5, Ground: 0, Flying: 2, Dragon: 0.5 },
  Grass:    { Fire: 0.5, Water: 2, Grass: 0.5, Poison: 0.5, Ground: 2, Flying: 0.5, Bug: 0.5, Rock: 2, Dragon: 0.5, Steel: 0.5 },
  Ice:      { Fire: 0.5, Water: 0.5, Grass: 2, Ice: 0.5, Ground: 2, Flying: 2, Dragon: 2, Steel: 0.5 },
  Fighting: { Normal: 2, Ice: 2, Poison: 0.5, Flying: 0.5, Psychic: 0.5, Bug: 0.5, Rock: 2, Ghost: 0, Dark: 2, Steel: 2, Fairy: 0.5 },
  Poison:   { Grass: 2, Poison: 0.5, Ground: 0.5, Rock: 0.5, Ghost: 0.5, Steel: 0, Fairy: 2 },
  Ground:   { Fire: 2, Electric: 2, Grass: 0.5, Poison: 2, Flying: 0, Bug: 0.5, Rock: 2, Steel: 2 },
  Flying:   { Electric: 0.5, Grass: 2, Fighting: 2, Bug: 2, Rock: 0.5, Steel: 0.5 },
  Psychic:  { Fighting: 2, Poison: 2, Psychic: 0.5, Dark: 0, Steel: 0.5 },
  Bug:      { Fire: 0.5, Grass: 2, Fighting: 0.5, Poison: 0.5, Flying: 0.5, Psychic: 2, Ghost: 0.5, Dark: 2, Steel: 0.5, Fairy: 0.5 },
  Rock:     { Fire: 2, Ice: 2, Fighting: 0.5, Ground: 0.5, Flying: 2, Bug: 2, Steel: 0.5 },
  Ghost:    { Normal: 0, Psychic: 2, Ghost: 2, Dark: 0.5 },
  Dragon:   { Dragon: 2, Steel: 0.5, Fairy: 0 },
  Dark:     { Fighting: 0.5, Psychic: 2, Ghost: 2, Dark: 0.5, Fairy: 0.5 },
  Steel:    { Fire: 0.5, Water: 0.5, Electric: 0.5, Ice: 2, Rock: 2, Steel: 0.5, Fairy: 2 },
  Fairy:    { Fire: 0.5, Fighting: 2, Poison: 0.5, Dragon: 2, Dark: 2, Steel: 0.5 },
};

/**
 * Calculates the effectiveness of an attacking type against a defending type.
 */
export function getEffectiveness(attackType, defenseType) {
  if (typeChart[attackType] && typeChart[attackType][defenseType] !== undefined) {
    return typeChart[attackType][defenseType];
  }
  return 1; // Default is 1x damage if not in the chart
}

/**
 * Calculates the total effectiveness against a dual-type Pokémon.
 * Example: Ice against Dragon/Ground = 2 * 2 = 4x
 */
export function getDualTypeEffectiveness(attackType, defenseTypes) {
  return defenseTypes.reduce((multiplier, defType) => {
    return multiplier * getEffectiveness(attackType, defType);
  }, 1);
}

/**
 * Returns all weaknesses (2x or 4x) of a mon based on its types
 */
export function getWeaknesses(defenseTypes) {
  const weaknesses = [];
  for (const attackType of Object.keys(typeChart)) {
    const multiplier = getDualTypeEffectiveness(attackType, defenseTypes);
    if (multiplier > 1) {
      weaknesses.push({ type: attackType, multiplier });
    }
  }
  return weaknesses;
}

/**
 * Returns all resistances (0.5x or 0.25x) and immunities (0x) of a mon
 */
export function getResistances(defenseTypes) {
  const resistances = [];
  for (const attackType of Object.keys(typeChart)) {
    const multiplier = getDualTypeEffectiveness(attackType, defenseTypes);
    if (multiplier < 1) {
      resistances.push({ type: attackType, multiplier });
    }
  }
  return resistances;
}