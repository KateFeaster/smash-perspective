import React from 'react';
import PlayerList from './PlayerList';
import sampleList from '../sampleData/samplePlayers';

function App() {
  return (
    <PlayerList
      players={sampleList.data.event.entrants.nodes.map((node) => ({
        id: node.participants[0].user.player.id,
        gamerTag: node.participants[0].user.player.gamerTag,
        prefix: node.participants[0].user.player.prefix,
        image:
          node.participants[0].user.images[0] &&
          node.participants[0].user.images[0].url,
      }))}
    />
  );
}

export default App;
