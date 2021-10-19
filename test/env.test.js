const env = require('..')('./fixtures/env.json');
const tap = require('tap');
const test = tap.test;

test('env core', ( t ) => {
  const Env = require('..');

  t.ok(Env.version);
  t.ok(env.ok);
  t.ok(env.get);

  t.equal(env.evars, require('./fixtures/env.json'));

  t.end();
})

test('env ok', ( t ) => {
  process.env['DBUSER'] = 'user';
  process.env['DBPASSWORD'] = 'password';

  t.ok(env.ok());

  delete process.env['DBUSER'];
  delete process.env['DBPASSWORD'];

  t.end();
})

test('env ok with env variables missed', ( t ) => {
  const missedEnvHandler = ( error ) => {
    t.ok(error);

    t.equal(error.message, 'DBPASSWORD not defined');
  }

  process.env['DBUSER'] = 'user';

  t.ok(!env.ok(missedEnvHandler));

  delete process.env['DBUSER'];
  t.end();
})

test('env get', ( t ) => {
  process.env['DBUSER'] = 'user';

  const dbUser = env.get('DBUSER');
  t.equal(dbUser, 'user');

  delete process.env['DBUSER'];

  t.end();
})

test('env get with error throwing', ( t ) => {
  t.throws(() => { env.get('NODE_ENV') });

  t.end();
})
