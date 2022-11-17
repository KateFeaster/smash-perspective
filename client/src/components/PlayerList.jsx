import React, { useState } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AutoComplete from '@mui/material/AutoComplete';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import PlayerListEntry from './PlayerListEntry';
import Player from '../Player';

function PlayerList({
  players,
  currentPlayer,
  setCurrentPlayer,
  pinnedPlayers,
  addPinnedPlayer,
  deletePinnedPlayer,
}) {
  const [inputValue, setInputValue] = useState('');

  const loadedPlayers = pinnedPlayers.reduce((prev, current) => {
    const player = players.find((p) => p.id === current);
    if (player) {
      return [...prev, player];
    }
    return prev;
  }, []);

  return (
    <List sx={{ padding: 0 }}>
      {loadedPlayers.map((player) => (
        <React.Fragment key={player.id}>
          <PlayerListEntry
            player={player}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
            deletePinnedPlayer={deletePinnedPlayer}
          />
          <Divider sx={{ width: '80%', margin: '0 auto' }} />
        </React.Fragment>
      ))}
      <ListItem>
        <AutoComplete
          options={players}
          getOptionLabel={(option) => option.gamerTag}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="Add a Player" />
          )}
          autoHighlight
          openOnFocus
          onChange={(e, newValue) => {
            if (newValue) {
              addPinnedPlayer(newValue);
            }
          }}
          inputValue={inputValue}
          onInputChange={(e, newValue, reason) => {
            if (reason === 'reset') {
              setInputValue('');
            } else {
              setInputValue(newValue);
            }
          }}
          fullWidth
          loading={players.length === 0}
        />
      </ListItem>
    </List>
  );
}

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
  currentPlayer: PropTypes.instanceOf(Player),
  setCurrentPlayer: PropTypes.func.isRequired,
  pinnedPlayers: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
  addPinnedPlayer: PropTypes.func.isRequired,
  deletePinnedPlayer: PropTypes.func.isRequired,
};

PlayerList.defaultProps = {
  players: [],
  currentPlayer: new Player({}),
  pinnedPlayers: [],
};

export default PlayerList;
