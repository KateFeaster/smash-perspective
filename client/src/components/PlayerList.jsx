import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PlayerListEntry from './PlayerListEntry';
import Player from '../Player';

function PlayerList({ players }) {
  return (
    <List>
      {players.map((player, index) => (
        <React.Fragment key={player.id}>
          <PlayerListEntry player={player} />
          {index !== players.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
};

PlayerList.defaultProps = {
  players: [],
};

export default PlayerList;
