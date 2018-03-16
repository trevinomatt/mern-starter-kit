if (process.env.NODE_ENV !== 'production') {
    module.exports = require('./development');
} else {
    module.exports = require('./production');
}