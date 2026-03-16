export default {
  "*.{js,jsx,ts,tsx}": ["oxlint --deny-warnings", "oxfmt --check"],
  "*.{json,md,yml,yaml}": ["oxfmt --check"],
};
