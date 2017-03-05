/**
 * Api helper.
 * @module helpers/Api
 */

import superagent from 'superagent';

import config from 'config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * Format the url.
 * @function formatUrl
 * @param {string} path Path to be formatted.
 * @returns {string} Formatted path.
 */
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return `${config.apiPath}${adjustedPath}`;
}

/**
 * Api class.
 * @class Api
 */
export default class Api {

  /**
   * Constructor
   * @method constructor
   * @param {Object} req Request object
   * @constructs _Api
   */
  constructor(req) {
    methods.forEach(method => {
      this[method] = (path, { params, data, type } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        const auth_token = localStorage.getItem('auth_token');

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        request.set('Accept', 'application/json');

        if (auth_token) {
          request.set('Authorization', `Bearer ${auth_token}`);
        }

        if (type) {
          request.type(type);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => (err ? reject(body || err) : resolve(body)));
      });
    });
  }
}
