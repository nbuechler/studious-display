'use strict';

import path from 'path';
import express from 'express';
import engine from 'react-engine';
import favicon from 'serve-favicon';
import config from '../config';

import proxy from 'proxy-express';

const app = express();
const port = config.app.port;

// -- Setup React Views engine -------------------------------------------------

app.engine('.jsx', engine.server.create({
  reactRoutes: path.join(__dirname, '..', 'shared', 'routes.js')
}));
app.set('views', path.join(__dirname, '..', 'shared', 'components'));
app.set('view engine', 'jsx');
app.set('view', engine.expressView);

// -- Routes & Middlewares -----------------------------------------------------

let publicPath = path.join(__dirname, '..', '..', '..', 'build', 'public');
app.use(express.static(publicPath));

let faviconPath = path.join(__dirname, '..', '..', '..', 'build', 'public', 'favicon.ico');
app.use(favicon(faviconPath));

let components = [
  { id: 1, title: 'This is a component, maybe I will put things in it' }
];

let all = [
    {
      'pies': [
        {
          'data': [
            2,
            4,
            5,
            4,
            7
          ],
          'key': 'P1'
        },
        {
          'data': [
            3,
            2,
            9,
            1,
            8
          ],
          'key': 'P2'
        },
        {
          'data': [
            3,
            4,
            0,
            7,
            8
          ],
          'key': 'P3'
        },
        {
          'data': [
            3,
            5,
            5,
            0,
            4
          ],
          'key': 'P4'
        },
        {
          'data': [
            3,
            8,
            3,
            2,
            3
          ],
          'key': 'P5'
        }
      ]
    },
    {
      'logCounts': [
        14,
        23,
        22,
        14,
        30
      ]
    }
  ];

app.use(proxy('localhost:5000/dummy', '/hi'));

app.get('*', (req, res) => {
  res.render(req.url, {
    components: components,
    dummyData: all,
    title: config.app.name
  });
});

// -- Start the application server ---------------------------------------------

app.listen(port, () => {
  console.log(`WebServer listening on port ${port}`);
});
