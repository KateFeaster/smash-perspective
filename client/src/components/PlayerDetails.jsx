import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PropTypes from 'prop-types';
import Player from '../Player';
import MatchCard from './MatchCard';

function numberWithSuffix(num) {
  const numAsNumber = parseInt(num, 10);
  if (numAsNumber === 1) {
    return '1st';
  }
  if (numAsNumber === 2) {
    return '2nd';
  }
  if (numAsNumber === 3) {
    return '3rd';
  }
  return `${numAsNumber}th`;
}

function PlayerDetails({ player, entrantCount, players }) {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>{`${numberWithSuffix(
        player.placement
      )} Place out of ${entrantCount}`}</Grid>
      <Grid xs={6}>
        <p>Wins - Losses</p>
        <p>{`${player.matches.length} - ${player.matches.length}`}</p>
      </Grid>
      <Grid xs={6}>
        <p>Seed</p>
        <p>{player.seed}</p>
      </Grid>
      <Grid container xs={12}>
        {player.matches.map((match) => (
          <MatchCard match={match} players={players} key={match.id} />
        ))}
      </Grid>
    </Grid>
  );
}

PlayerDetails.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
  entrantCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

PlayerDetails.defaultProps = {
  entrantCount: 0,
};

export default PlayerDetails;
