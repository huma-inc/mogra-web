module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
  ], plugins: [
    'stylelint-order',
  ], rules: {
    'order/properties-alphabetical-order': null,
    'no-descending-specificity': null,
    'selector-class-pattern': [
      '^[a-z]([a-z0-9]+(-[a-z0-9]+)*)?(__[a-z0-9-]+)?(--[a-z0-9-]+)?$',
      {
        message: 'Selector class names must be kebab-case, lowercase, or follow BEM syntax.',
      },
    ],
  },
};