const path = require('path');

const curryPathJoin = (pathToCurry) => (targetPath) => path.join(pathToCurry, targetPath);

const pluginGenerator = (FunctionContructor, baseConfig) => (overrides) => {
    return new FunctionContructor({
        ...baseConfig,
        ...overrides
    });
}

module.exports = {
    curryPathJoin,
    pluginGenerator
};
