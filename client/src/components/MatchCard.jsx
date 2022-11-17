import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Match from '../Match';
import PlayerCard from './PlayerCard';

const DISPLAY_SCORE_COLORS = {
  true: 'green',
  false: 'red',
  null: 'black',
};

function MatchCard({ match }) {
  return (
    <Paper sx={{ p: 1 }} variant="outlined">
      <Grid container>
        <Grid xs={5}>
          <Typography>{match.fullRoundText}</Typography>
          <Typography sx={{ color: DISPLAY_SCORE_COLORS[match.won] }}>
            {match.displayScore}
          </Typography>
        </Grid>
        <Grid xs={2} display="flex" alignItems="center" justifyContent="center">
          <Typography>VS</Typography>
        </Grid>
        <Grid xs={5} display="flex" gap={1}>
          <PlayerCard player={match.opponent} />
        </Grid>
      </Grid>
    </Paper>
  );
}

MatchCard.propTypes = {
  match: PropTypes.instanceOf(Match).isRequired,
};

MatchCard.defaultProps = {};

export default MatchCard;
