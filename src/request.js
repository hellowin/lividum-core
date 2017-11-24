const cheerio = require('cheerio');
const request = require('request-promise');

class Request {

  constructor(uri) {
    this.uri = uri;
    this.parser = {};
    this.parsed = {};
  }

  parse(bucket, func) {
    this.parser[bucket] = func;
    return this;
  }

  fetch() {
    return request({
      uri: this.uri,
      transform: body => cheerio.load(body),
    })
    .then($ => {
      for (var bucket in this.parser) {
        const func = this.parser[bucket];

        try {
          this.parsed[bucket] = func($);
        } catch(e) {
          this.parsed[bucket] = null;
        }
      }
      return $;
    })
    .then($ => ({
      uri: this.uri,
      $: $,
      html: $.html(),
      parsed: this.parsed,
    }));
  }

}

module.exports = Request;
