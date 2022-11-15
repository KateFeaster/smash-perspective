import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Player from '../Player';

function PlayerListEntry({ player }) {
  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar alt={`${player.gamerTag}'s Avatar`} src={player.profileImage} />{' '}
      </ListItemAvatar>
      <ListItemText
        primary={`${player.prefix ? `${player.prefix} | ` : ''}${
          player.gamerTag
        }`}
      />
    </ListItemButton>
  );
}

PlayerListEntry.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
};

export default PlayerListEntry;
