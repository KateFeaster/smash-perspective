import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import PlayerListEntry from './PlayerListEntry';

function PlayerList({ players }) {
  return (
    <List>
      {players.map((player) => (
        <PlayerListEntry player={player} key={player.id} />
      ))}
    </List>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      gamerTag: PropTypes.string,
      image: PropTypes.string,
      prefix: PropTypes.string,
    })
  ),
};

PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
