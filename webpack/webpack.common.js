const { curryPathJoin } = require('./utilities');
const { pathMap } = require('./constants');

const srcPathJoiner = curryPathJoin(pathMap.src);

// TODO: Add TS to node server
module.exports = {
  resolve: {
    alias: {
      '@AppFrame': srcPathJoiner('app-frame'),
      '@Components': srcPathJoiner('components'),
      '@Contexts': srcPathJoiner('contexts'),
      '@Icons': srcPathJoiner('icons'),
      '@Pages': srcPathJoiner('pages'),
      '@Theme': srcPathJoiner('styles/theme'),
      '@Utils': srcPathJoiner('utility-functions'),
      '@Store': srcPathJoiner('store'),
      '@Modules': srcPathJoiner('modules'),
      '@Hooks': srcPathJoiner('hooks'),
      '@Types': srcPathJoiner('types')
    },
    extensions: ['.tsx', '.ts', '.js']
  }
};
