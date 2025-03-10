export default {
  testEnvironment: "jsdom", // Required for testing React components
  //   setupFilesAfterEnv: ["meta_advanced/src/App.test.jsx"], // Add setup file
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
};
