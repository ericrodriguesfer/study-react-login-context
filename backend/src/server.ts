import app from './app/app';

process.on('SIGTERM', () => {
  process.exit();
});

app.listen(process.env.API_PORT || 3333, () =>
  console.log('Server was started...'),
);
