module.exports = {
    "root": true,
    "extends": "airbnb",
    "parser": "babel-eslint",
    "globals": {
        window: true,
        document: true
    },
    "env": {
        "jest": true,
        "browser": true,
        "es6": true,
        "commonjs": true,
    },
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["."]
            }
        }
    },
    "rules": {
        "object-curly-spacing": 0,
        "max-len": ["error", 120],
        "react/jsx-filename-extension": 0,
        "indent": ["error", 2, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            // MemberExpression: null,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            FunctionExpression: {
                parameters: 1,
                body: 1
            },
            CallExpression: {
                arguments: 1
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            // ignoredNodes: ['JSXElement *']
        }],
        "react/jsx-indent-props": ["error", 2],
        "react/jsx-indent": ["error", 2],
        "react/prop-types": 0,
        "import/no-named-as-default": 0,
        "jsx-a11y/anchor-is-valid": ["error", {
            "components": ["Link"],
            "specialLink": ["hrefLeft", "hrefRight"],
            "aspects": ["invalidHref", "preferButton"]
        }],
    }
};
