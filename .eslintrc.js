module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "transform": {
      '^.+\\.ts?$': 'ts-jest',
    },
    "extends": [
      "airbnb-base",
      "import",
    ],
    "plugins": [
      "import"
    ],
    "rules": {
    }
};
