import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PlayerListEntry from './PlayerListEntry';
import Player from '../Player';

function PlayerList({ players, currentPlayer, setCurrentPlayer }) {
  return (
    <List sx={{ padding: 0 }}>
      {players.map((player, index) => (
        <React.Fragment key={player.id}>
          <PlayerListEntry
            player={player}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
          />
          {index !== players.length - 1 && (
            <Divider sx={{ width: '80%', margin: '0 auto' }} />
          )}
        </React.Fragment>
      ))}
    </List>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
  currentPlayer: PropTypes.instanceOf(Player),
  setCurrentPlayer: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  players: [],
  currentPlayer: new Player({}),
};

export default PlayerList;
