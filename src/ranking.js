// src/ranking.js
import { typeChart, getEffectiveness } from './typeEffectiveness.js';

const allTypes = Object.keys(typeChart);

/**
 * Calculates the offensive score of a type: how good it is against all other types.
 */
export function getOffensiveScore(attackType) {
  let total = 0;
  for (const defenseType of allTypes) {
    total += getEffectiveness(attackType, defenseType);
  }
  return total / allTypes.length;
}

/**
 * Calculates the defensive score of a type: how well it resists all other types.
 */
export function getDefensiveScore(defenseType) {
  let total = 0;
  for (const attackType of allTypes) {
    total += getEffectiveness(attackType, defenseType);
  }
  return total / allTypes.length;
}

/**
 * Calculates the total score of a type.
 * The defensive score is inverted because a lower defensive score is better.
 */
export function getTotalScore(type) {
  const offensive = getOffensiveScore(type);
  const defensive = getDefensiveScore(type);

  // Invert the defensive score so that a lower defensive score contributes positively
  const invertedDefensive = 2 - defensive;

  return {
    type,
    offensive: offensive.toFixed(3),
    defensive: defensive.toFixed(3),
    total: (offensive + invertedDefensive).toFixed(3),
  };
}

/**
 * Returns a ranking of all types based on their total score.
 */
export function getRanking() {
  const scores = allTypes.map((type) => getTotalScore(type));
  return scores.sort((a, b) => b.total - a.total);
}