module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest": true,
    },
    "extends": ["airbnb-base"],
    "plugins": [
      "import"
    ],
    "rules": {
      "class-methods-use-this": "off",
      "no-underscore-dangle": "off",
      "import/prefer-default-export": "off",
    }
};
