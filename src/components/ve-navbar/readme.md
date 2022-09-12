# ve-header



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `alpha`        | `alpha`         |             | `number`  | `undefined` |
| `background`   | `background`    |             | `string`  | `undefined` |
| `contact`      | `contact`       |             | `string`  | `undefined` |
| `height`       | `height`        |             | `number`  | `80`        |
| `label`        | `label`         |             | `string`  | `undefined` |
| `logo`         | `logo`          |             | `string`  | `undefined` |
| `offset`       | `offset`        |             | `number`  | `0`         |
| `searchDomain` | `search-domain` |             | `string`  | `undefined` |
| `sticky`       | `sticky`        |             | `boolean` | `undefined` |
| `subtitle`     | `subtitle`      |             | `string`  | `undefined` |


## Dependencies

### Used by

 - [ve-header](../ve-header)

### Depends on

- [ve-site-search](../ve-site-search)
- [ve-menu](../ve-menu)

### Graph
```mermaid
graph TD;
  ve-navbar --> ve-site-search
  ve-navbar --> ve-menu
  ve-menu --> ve-contact
  ve-menu --> ve-content-viewer
  ve-header --> ve-navbar
  style ve-navbar fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
