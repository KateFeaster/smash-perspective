import React, { useEffect } from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Player from '../Player';
import MatchCard from './MatchCard';
import Match from '../Match';

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

function PlayerDetails({ player, entrantCount, players, setPlayerMatches }) {
  useEffect(() => {
    if (player.id) {
      Axios.get(`/matches?entrant_id=${player.id}`).then((response) => {
        const newMatches = response.data.data.entrant.paginatedSets.nodes.map(
          (node) =>
            new Match({
              fullRoundText: node.fullRoundText,
              phase: node.phaseGroup.phase.name,
              pool: node.phaseGroup.displayIdentifier,
              displayScore: node.displayScore,
              id: node.id,
              won: node.winnerId
                ? node.winnerId === response.data.data.entrant.id
                : null,
              opponent: new Player({
                id: node.slots.find(
                  (slot) => slot.entrant.id !== response.data.data.entrant.id
                ).entrant.id,
                gamerTag: node.slots.find(
                  (slot) => slot.entrant.id !== response.data.data.entrant.id
                ).entrant.participants[0].gamerTag,
                prefix: node.slots.find(
                  (slot) => slot.entrant.id !== response.data.data.entrant.id
                ).entrant.participants[0].prefix,
                profileImage:
                  node.slots.find(
                    (slot) => slot.entrant.id !== response.data.data.entrant.id
                  ).entrant.participants[0].user.images[0] &&
                  node.slots.find(
                    (slot) => slot.entrant.id !== response.data.data.entrant.id
                  ).entrant.participants[0].user.images[0].url,
              }),
            })
        );

        setPlayerMatches(player.id, newMatches);
      });
    }
  }, [player.id]);

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          margin: '15px',
          backgroundColor: 'white',
          '--Grid-borderWidth': '2px',
          borderTop: 'var(--Grid-borderWidth) solid',
          borderLeft: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
          '& > div': {
            borderRight: 'var(--Grid-borderWidth) solid',
            borderBottom: 'var(--Grid-borderWidth) solid',
            borderColor: 'divider',
          },
        }}
      >
        <Grid xs={12} display="flex" justifyContent="center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h4">
              {`${numberWithSuffix(player.placement)} Place`}
            </Typography>
            <Typography align="center">{`out of ${entrantCount}`}</Typography>
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
      <Stack spacing={2} sx={{ width: '50%', margin: '0 auto' }}>
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
  setPlayerMatches: PropTypes.func.isRequired,
};

PlayerDetails.defaultProps = {
  entrantCount: 0,
  players: [],
};

export default PlayerDetails;
