# ve-header



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `background`   | `background`    |             | `string`  | `'#777'`    |
| `contact`      | `contact`       |             | `string`  | `undefined` |
| `height`       | `height`        |             | `number`  | `undefined` |
| `label`        | `label`         |             | `string`  | `undefined` |
| `logo`         | `logo`          |             | `string`  | `undefined` |
| `options`      | `options`       |             | `string`  | `undefined` |
| `position`     | `position`      |             | `string`  | `'center'`  |
| `searchDomain` | `search-domain` |             | `string`  | `undefined` |
| `sticky`       | `sticky`        |             | `boolean` | `undefined` |
| `subtitle`     | `subtitle`      |             | `string`  | `undefined` |


## Dependencies

### Depends on

- [ve-hero](../ve-hero)
- [ve-navbar](../ve-navbar)

### Graph
```mermaid
graph TD;
  ve-header --> ve-hero
  ve-header --> ve-navbar
  ve-navbar --> ve-site-search
  ve-navbar --> ve-menu
  ve-menu --> ve-contact
  style ve-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
