import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import PlayerList from './PlayerList';
// import sampleMatches from '../sampleData/sampleMatches';
import PlayerDetails from './PlayerDetails';
import Player from '../Player';
import Match from '../Match';

// const matches = sampleMatches.data.entrant.paginatedSets.nodes.map(
//   (node) =>
//     new Match({
//       fullRoundText: node.fullRoundText,
//       phase: node.phaseGroup.phase.name,
//       pool: node.phaseGroup.displayIdentifier,
//       opponentId: node.slots.find(
//         (slot) => slot.entrant.id !== sampleMatches.data.entrant.id
//       ).entrant.id,
//       displayScore: node.displayScore,
//       id: node.id,
//       won: node.winnerId
//         ? node.winnerId === sampleMatches.data.entrant.id
//         : null,
//     })
// );

// players[0].matches = matches;

function App() {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState(
    new Player({ placement: 0, seed: 0 })
  );

  useEffect(
    () => {
      if (totalPages === -1 || page <= totalPages) {
        Axios.get(`/players?page=${page}`).then((response) => {
          const newPlayers = response.data.data.event.entrants.nodes.map(
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

          setPage(page + 1);
          setTotalPages(response.data.data.event.entrants.pageInfo.totalPages);
          setPlayers([...players, ...newPlayers]);
          if (currentPlayer.id === undefined) {
            setCurrentPlayer(newPlayers[0]);
          }
        });
      }
    },
    [
      /* page */
    ]
  );

  return (
    <Grid container spacing={2}>
      <Grid xs={3}>
        <PlayerList players={players} />
      </Grid>
      <Grid xs={8}>
        <PlayerDetails
          player={currentPlayer}
          entrantCount={600}
          players={players}
        />
      </Grid>
    </Grid>
  );
}

export default App;
