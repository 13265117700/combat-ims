const Base = require('./base')

class Article extends Base {
  constructor(props = 'article'){
    super(props)
  }
}

module.exports = new Article