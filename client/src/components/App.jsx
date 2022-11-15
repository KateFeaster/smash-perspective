import React from 'react';
import PlayerList from './PlayerList';

const sampleList = [
  {
    id: 1,
    gamerTag: 'Chronos',
    image:
      'https://www.bing.com/th?pid=Sgg&qlt=100&u=https%3A%2F%2Fimages.start.gg%2Fimages%2Fuser%2F10213%2Fimage-c40810b15eb9654250288324f6f198f0-optimized.png&ehk=y%2BnUr%2BgGC2G2zW0NGOtkVDLyAmzVFUOD8nwRUNhNM4Y%3D&w=160&h=160&r=0&c=3',
  },
  { id: 2, gamerTag: 'Shoe', prefix: 'Pre' },
];

function App() {
  return <PlayerList players={sampleList} />;
}

export default App;
