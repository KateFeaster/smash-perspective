import React, { useState, useEffect } from 'react';
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
}) {
  const [inputValue, setInputValue] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (isSelected) {
      setIsSelected(false);
      setInputValue('');
    }
  }, [isSelected]);

  return (
    <List sx={{ padding: 0 }}>
      {pinnedPlayers.map((player) => (
        <React.Fragment key={player.id}>
          <PlayerListEntry
            player={player}
            currentPlayer={currentPlayer}
            setCurrentPlayer={setCurrentPlayer}
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
          clearOnEscape
          openOnFocus
          onChange={(e, newValue) => {
            if (newValue) {
              addPinnedPlayer(newValue);
            }
          }}
          onClose={() => setIsSelected(true)}
          inputValue={inputValue}
          onInputChange={(e, newValue) => setInputValue(newValue)}
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
};

PlayerList.defaultProps = {
  players: [],
  currentPlayer: new Player({}),
  pinnedPlayers: [],
};

export default PlayerList;
