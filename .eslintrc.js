module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:vue/essential",
        "standard"
    ],
    // "extends": [
    //     "plugin:vue/recommended",
    //     '@vue/airbnb'
    // ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        // "parser": "@typescript-eslint/parser",
        "parser": "babel-eslint",
        "sourceType": "module"
    },
    "plugins": [
        "vue",
        "@typescript-eslint",
        "html"
    ],
    "rules": {
        "indent": ['error', 4],
    },
};