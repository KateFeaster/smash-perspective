import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import Player from '../Player';

function PlayerCard({ player }) {
  return (
    <>
      <Avatar
        alt={`${player.gamerTag}'s Avatar`}
        src={player.profileImage}
        sx={{
          height: '52px',
          width: '52px',
        }}
      />
      <Typography>{`${player.prefix ? `${player.prefix} | ` : ''}${
        player.gamerTag
      }`}</Typography>
    </>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
};

export default PlayerCard;
