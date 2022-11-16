import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Match from '../Match';
import Player from '../Player';
import PlayerCard from './PlayerCard';

function MatchCard({ match, players }) {
  return (
    <Paper>
      <Grid container xs={7}>
        <Grid xs={5}>
          <Typography>{match.fullRoundText}</Typography>
          <Typography>{match.displayScore}</Typography>
        </Grid>
        <Grid xs={2}>
          <Typography>VS</Typography>
        </Grid>
        <Grid xs={5}>
          {players.find((player) => player.id === match.opponentId) && (
            <PlayerCard
              player={players.find((p) => p.id === match.opponentId)}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}

MatchCard.propTypes = {
  match: PropTypes.instanceOf(Match).isRequired,
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
};

MatchCard.defaultProps = {
  players: [],
};

export default MatchCard;
