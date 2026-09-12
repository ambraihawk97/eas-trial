// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // Upstream solve9 uses canonical RN Animated patterns (useRef(new
    // Animated.Value()).current read during render) and effect-driven state
    // sync (uniwind theme restore). These are intentional upstream patterns;
    // the new compiler-era hooks rules are not applicable.
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);
