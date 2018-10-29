module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "modules": false,
      // "debug": true
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
