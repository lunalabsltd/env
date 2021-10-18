/*!
 * env
 * Copyright(c) 2011 Daniel D. Shaw <dshaw@dshaw.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

const path = require('path');
const fs = require('fs');

/**
 * Env Manager
 */

function Env ( envfile = 'env.json' ) {
  this.envfile = path.join(process.cwd(), envfile);
  this.evars = fs.existsSync(this.envfile) ? require(this.envfile) : {};
}

/**
 * Verify environment variables
 *
 * @param fn callback
 * @api public
 */

Env.prototype.ok = function ( missedEnvHandler ) {
  for (const evar in this.evars) {
    if (!process.env[evar]) {
      const error = new Error(evar + ' not defined');

      missedEnvHandler(error);

      return false;
    }
  }

  return true;
}

/**
 * Environment variable getter
 *
 * @param name
 * @api public
 */

Env.prototype.get = function ( name ) {
  if (!this.evars[name]) {
    const error = new Error(name + ' not known. Please add it to the env.json');

    throw(error);
  }

  return process.env[name];
}

/**
 * Instantiate Env
 */

const envCreator = ( envfile ) => {
  return new Env(envfile);
}

/**
 * Exports
 */

module.exports = envCreator;
