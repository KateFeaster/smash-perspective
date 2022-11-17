import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import PlayerList from './PlayerList';
import PlayerDetails from './PlayerDetails';
import Player from '../Player';
import SmashLogo from '../../assets/img/SmashLogo.svg';

function App() {
  const [players, setPlayers] = useState([]);
  const [pinnedPlayers, setPinnedPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(-1);
  const [currentPlayer, setCurrentPlayer] = useState(
    new Player({ placement: 0, seed: 0 })
  );

  const setPlayerMatches = (id, matches) => {
    const newPlayers = [...players];
    newPlayers.find((player) => player.id === id).matches = matches;
    setPlayers(newPlayers);
  };

  const getPinnedPlayers = () => {
    Axios.get('/pinned-players').then((result) => {
      setPinnedPlayers(result.data);
    });
  };

  const addPinnedPlayer = (newPlayer) => {
    Axios.post('/pinned-players', { entrant_id: newPlayer.id }).then(
      getPinnedPlayers
    );
  };

  const deletePinnedPlayer = (targetPlayer) => {
    Axios.delete(`/pinned-players?entrant_id=${targetPlayer.id}`).then(
      getPinnedPlayers
    );
  };

  useEffect(getPinnedPlayers, []);

  useEffect(() => {
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
      });
    }
  }, [page]);

  return (
    <Grid container>
      <Grid
        xs={12}
        display="flex"
        gap={1}
        sx={{ backgroundColor: '#d32525', padding: '10px' }}
      >
        <Avatar alt="Super Smash Bros Logo" src={SmashLogo} />
        <Typography
          sx={{ color: 'white', fontSize: '2em', fontWeight: 'bold' }}
        >
          Smash Perspective
        </Typography>
      </Grid>
      <Grid xs={3}>
        <PlayerList
          players={players}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          pinnedPlayers={pinnedPlayers}
          addPinnedPlayer={addPinnedPlayer}
          deletePinnedPlayer={deletePinnedPlayer}
        />
      </Grid>
      <Grid xs={9} sx={{ backgroundColor: '#bbbbbb' }}>
        <PlayerDetails
          player={currentPlayer}
          entrantCount={600}
          setPlayerMatches={setPlayerMatches}
        />
      </Grid>
    </Grid>
  );
}

export default App;
