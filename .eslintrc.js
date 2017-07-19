module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
          "experimentalObjectRestSpread": true
        }
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": [
      "react"
    ],
    "rules": {
        //"no-debugger": "off",
        "strict": "warn",
        "no-undef": "warn",
        //"semi": [
        //  "error",
        //  "always"
        //],
        "no-console": "off",
        "arrow-parens": ["warn", "always"],
        //"arrow-body-style": ["warn", "always"],
        "arrow-spacing": "warn",
        "generator-star-spacing": "warn",
        //"no-confusing-arrow": "warn",
        "no-duplicate-imports": "warn",
        "no-useless-computed-key": "warn",
        "no-useless-constructor": "warn",
        "no-useless-rename": "warn",
        "no-var": "warn",
        "object-shorthand": "warn",
        "prefer-arrow-callback": "warn",
        "prefer-const": "warn",
        "prefer-rest-params": "warn",
        "prefer-spread": "warn",
        "prefer-template": "warn",
        "rest-spread-spacing": "warn",
        "template-curly-spacing": "warn",
        "yield-star-spacing": "warn",
        "react/prop-types": [1, { ignore: ["dispatch"] }]
    },
    // An environment defines global variables that are predefined. 
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    }
}
