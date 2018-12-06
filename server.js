const express = require('express');
const { Client } = require('pg');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// APP
const app = express();
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:password@postgres/node';

const client = new Client({
  connectionString,
});

console.log('DEBUG', client);

// connect to our database
client.connect((err) => {
  if (err) throw err;

  // execute a query on our database
  client.query('SELECT datname FROM pg_database WHERE datistemplate = false;', (err, result) => {
    if (err) throw err;

    // just print the result to the console
    console.log(result.rows);

    // disconnect the client
    // client.end((err) => {
    //   if (err) throw err;
    // });
  });
});


app.get('/', (req, res, next) => {
  console.log(req.headers);

  client.query('SELECT NOW()')
    .then((r) => {
      console.log(r);
    })
    .catch((err) => {
      console.error('error', err.stack);
    });

  res.send({ hello: 'world' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}/`);
});
