import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Player from '../Player';

function PlayerListEntry({ player, currentPlayer, setCurrentPlayer }) {
  const inner = (
    <>
      <ListItemAvatar>
        <Avatar alt={`${player.gamerTag}'s Avatar`} src={player.profileImage} />{' '}
      </ListItemAvatar>
      <ListItemText
        primary={`${player.prefix ? `${player.prefix} | ` : ''}${
          player.gamerTag
        }`}
      />
    </>
  );

  if (player === currentPlayer) {
    return <ListItem sx={{ backgroundColor: '#bbbbbb' }}>{inner}</ListItem>;
  }

  return (
    <ListItemButton onClick={() => setCurrentPlayer(player)}>
      {inner}
    </ListItemButton>
  );
}

PlayerListEntry.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
};

export default PlayerListEntry;
