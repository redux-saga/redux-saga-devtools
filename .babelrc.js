module.exports = {
  plugins: ["@babel/plugin-proposal-class-properties"],
  presets: [
    [
      "@babel/env",
      { targets: { chrome: "73" }, useBuiltIns: "entry", corejs: 3 }
    ],
    "@babel/preset-react"
  ]
};
