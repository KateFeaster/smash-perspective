import React from 'react';
import PropTypes from 'prop-types';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

function PlayerListEntry({ player }) {
  return (
    <ListItemButton>
      <ListItemAvatar>
        <Avatar alt={`${player.gamerTag}'s Avatar`} src={player.image} />{' '}
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
  player: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gamerTag: PropTypes.string,
    image: PropTypes.string,
    prefix: PropTypes.string,
  }).isRequired,
};

export default PlayerListEntry;
