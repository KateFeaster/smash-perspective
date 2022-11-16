import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import Match from '../Match';
import Player from '../Player';
import PlayerListEntry from './PlayerListEntry';

function MatchCard({ match, players }) {
  return (
    <Grid xs={12} key={match.id}>
      {players.find((player) => player.id === match.opponentId) && (
        <PlayerListEntry
          player={players.find((p) => p.id === match.opponentId)}
        />
      )}
      {match.fullRoundText}
      {match.displayScore}
    </Grid>
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
