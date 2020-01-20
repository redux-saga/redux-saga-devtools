module.exports = {
  presets: [
    [
      "@babel/env",
      { targets: { chrome: "73" }, useBuiltIns: "usage", corejs: 3 }
    ],
    [
      "@babel/preset-typescript",
      {
        isTSX: true,
        allExtensions: true
      }
    ],
    "@babel/preset-react"
  ]
};
