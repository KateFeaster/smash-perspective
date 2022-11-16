import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Player from '../Player';
import MatchCard from './MatchCard';

function numberWithSuffix(num) {
  const numAsNumber = parseInt(num, 10);
  if (numAsNumber === 1) {
    return '1st';
  }
  if (numAsNumber === 2) {
    return '2nd';
  }
  if (numAsNumber === 3) {
    return '3rd';
  }
  return `${numAsNumber}th`;
}

function PlayerDetails({ player, entrantCount, players }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} display="flex" justifyContent="center">
          <Typography>
            {`${numberWithSuffix(
              player.placement
            )} Place out of ${entrantCount}`}
          </Typography>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Wins</Typography>
            <Typography>
              {player.matches.reduce((prev, curr) => prev + curr.won, 0)}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Losses</Typography>
            <Typography>
              {player.matches.reduce(
                (prev, curr) => prev + (curr.won === false),
                0
              )}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography>Seed</Typography>
            <Typography>{player.seed}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Stack spacing={2}>
        {player.matches.map((match) => (
          <MatchCard match={match} players={players} key={match.id} />
        ))}
      </Stack>
    </>
  );
}

PlayerDetails.propTypes = {
  player: PropTypes.instanceOf(Player).isRequired,
  entrantCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  players: PropTypes.arrayOf(PropTypes.instanceOf(Player)),
};

PlayerDetails.defaultProps = {
  entrantCount: 0,
  players: [],
};

export default PlayerDetails;
