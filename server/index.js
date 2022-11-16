const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Axios = require('axios');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/players', (req, res) => {
  const query = {
    query: `query Entrants($entrantsPage:Int!){
      event(slug: "tournament/port-priority-7/event/ultimate-singles") {
        entrants(query: {page: $entrantsPage, perPage:100 sortBy: "createdAt ASC"}) {
          pageInfo{
            totalPages
          }
          nodes {
            id
            initialSeedNum
            participants {
              user {
                player {
                  gamerTag
                  prefix
                }
                images (type: "profile") {
                  url
                }
              }
            }
            standing {
              placement
            }
          }
        }
      }
    }`,
    variables: { entrantsPage: req.query.page },
  };

  Axios.post('https://api.start.gg/gql/alpha', query, {
    headers: { Authorization: `Bearer ${process.env.STARTGG_API_TOKEN}` },
  })
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000');
});
