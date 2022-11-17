import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Player from '../Player';

function PlayerListEntry({
  player,
  currentPlayer,
  setCurrentPlayer,
  deletePinnedPlayer,
}) {
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
    <ListItem
      secondaryAction={
        <IconButton edge="end" onClick={() => deletePinnedPlayer(player)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton onClick={() => setCurrentPlayer(player)}>
        {inner}
      </ListItemButton>
    </ListItem>
  );
}

PlayerListEntry.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
  currentPlayer: PropTypes.instanceOf(Player).isRequired,
  setCurrentPlayer: PropTypes.func.isRequired,
  deletePinnedPlayer: PropTypes.func.isRequired,
};

export default PlayerListEntry;
