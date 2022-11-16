import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Player from '../Player';

function PlayerCard({ player }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Avatar alt={`${player.gamerTag}'s Avatar`} src={player.profileImage} />
      <Typography>{`${player.prefix ? `${player.prefix} | ` : ''}${
        player.gamerTag
      }`}</Typography>
    </Box>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
};

export default PlayerCard;
