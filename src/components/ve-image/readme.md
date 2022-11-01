# ve-image-viewer



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute        | Description | Type      | Default     |
| -------------- | ---------------- | ----------- | --------- | ----------- |
| `align`        | `align`          |             | `string`  | `undefined` |
| `alt`          | `alt`            |             | `string`  | `undefined` |
| `annoBase`     | `anno-base`      |             | `string`  | `undefined` |
| `cards`        | `cards`          |             | `boolean` | `false`     |
| `compare`      | `compare`        |             | `boolean` | `false`     |
| `curtain`      | `curtain`        |             | `boolean` | `false`     |
| `entities`     | `entities`       |             | `string`  | `undefined` |
| `fit`          | `fit`            |             | `string`  | `undefined` |
| `grid`         | `grid`           |             | `boolean` | `false`     |
| `height`       | `height`         |             | `string`  | `undefined` |
| `options`      | `options`        |             | `string`  | `undefined` |
| `seq`          | `seq`            |             | `number`  | `1`         |
| `src`          | `src`            |             | `string`  | `undefined` |
| `sticky`       | `sticky`         |             | `boolean` | `undefined` |
| `sync`         | `sync`           |             | `boolean` | `false`     |
| `width`        | `width`          |             | `string`  | `'100%'`    |
| `zoomOnScroll` | `zoom-on-scroll` |             | `boolean` | `false`     |


## Dependencies

### Used by

 - [ve-image-grid](../ve-image-grid)

### Depends on

- [ve-manifest](../ve-manifest)
- [ve-image-card](../ve-image-card)

### Graph
```mermaid
graph TD;
  ve-image --> ve-manifest
  ve-image --> ve-image-card
  ve-image-grid --> ve-image
  style ve-image fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
