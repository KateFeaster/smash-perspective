import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import PlayerList from './PlayerList';
import sampleList from '../sampleData/samplePlayers';
import sampleMatches from '../sampleData/sampleMatches';
import PlayerDetails from './PlayerDetails';
import Player from '../Player';
import Match from '../Match';

const players = sampleList.data.event.entrants.nodes.map(
  (node) =>
    new Player({
      id: node.id,
      gamerTag: node.participants[0].user.player.gamerTag,
      prefix: node.participants[0].user.player.prefix,
      profileImage:
        node.participants[0].user.images[0] &&
        node.participants[0].user.images[0].url,
      seed: node.initialSeedNum,
      placement: node.standing.placement,
    })
);

const matches = sampleMatches.data.entrant.paginatedSets.nodes.map(
  (node) =>
    new Match({
      fullRoundText: node.fullRoundText,
      phase: node.phaseGroup.phase.name,
      pool: node.phaseGroup.displayIdentifier,
      opponentId: node.slots.find(
        (slot) => slot.entrant.id !== sampleMatches.data.entrant.id
      ).entrant.id,
      displayScore: node.displayScore,
      id: node.id,
      won: node.winnerId
        ? node.winnerId === sampleMatches.data.entrant.id
        : null,
    })
);

players[0].matches = matches;

function App() {
  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <PlayerList players={players} />
      </Grid>
      <Grid xs={8}>
        <PlayerDetails
          player={players[0]}
          entrantCount={600}
          players={players}
        />
      </Grid>
    </Grid>
  );
}

export default App;
