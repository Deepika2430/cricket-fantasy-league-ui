import { PlayerStats } from '../types';

export const calculateBattingPoints = (stats: PlayerStats): number => {
  let points = 0;

  // Base runs
  points += stats.runs;

  // Boundary bonus
  points += stats.fours;
  points += stats.sixes * 2;

  // Milestones
  if (stats.runs >= 100) points += 16;
  else if (stats.runs >= 50) points += 8;

  // Strike rate points (T20)
  if (stats.balls >= 10) {
    const strikeRate = (stats.runs / stats.balls) * 100;
    if (strikeRate > 170) points += 6;
    else if (strikeRate > 150) points += 4;
    else if (strikeRate > 130) points += 2;
    else if (strikeRate < 70 && strikeRate >= 60) points -= 2;
    else if (strikeRate < 60 && strikeRate >= 50) points -= 4;
    else if (strikeRate < 50) points -= 6;
  }

  return points;
};

export const calculateBowlingPoints = (stats: PlayerStats): number => {
  let points = 0;

  // Wickets
  points += stats.wickets * 25;

  // Maiden overs
  points += stats.maidens * 8;

  // Milestone bonuses
  if (stats.wickets >= 5) points += 16;
  else if (stats.wickets >= 4) points += 8;

  // Economy rate points (T20)
  if (stats.overs >= 2) {
    const economy = stats.economyRate;
    if (economy < 5) points += 6;
    else if (economy < 6) points += 4;
    else if (economy < 7) points += 2;
    else if (economy > 9 && economy <= 10) points -= 2;
    else if (economy > 10 && economy <= 11) points -= 4;
    else if (economy > 11) points -= 6;
  }

  return points;
};

export const calculateFieldingPoints = (stats: PlayerStats): number => {
  let points = 0;

  points += stats.catches * 8;
  points += stats.stumpings * 12;
  points += stats.runouts * 12; // Assuming direct runouts

  return points;
};