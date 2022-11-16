import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Match from '../Match';
import Player from '../Player';
import PlayerCard from './PlayerCard';

const DISPLAY_SCORE_COLORS = {
  true: 'green',
  false: 'red',
  null: 'black',
};

function MatchCard({ match, players }) {
  return (
    <Paper sx={{ p: 1 }} variant="outlined">
      <Grid container>
        <Grid xs={5}>
          <Typography>{match.fullRoundText}</Typography>
          <Typography sx={{ color: DISPLAY_SCORE_COLORS[match.won] }}>
            {match.displayScore}
          </Typography>
        </Grid>
        <Grid
          xs={2}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
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
