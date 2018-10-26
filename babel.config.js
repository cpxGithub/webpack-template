module.exports = {
  "presets": [
    ["@babel/preset-env", {
      "targets": { "browsers": ["ie >=9"] },
      "modules": false,
      "useBuiltIns": "usage"
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import"
  ]
}
