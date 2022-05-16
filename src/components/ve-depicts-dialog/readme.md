# ve-entities



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute    | Description | Type      | Default     |
| ----------- | ------------ | ----------- | --------- | ----------- |
| `depicted`  | --           |             | `any[]`   | `[]`        |
| `imageHash` | `image-hash` |             | `string`  | `undefined` |
| `label`     | `label`      |             | `string`  | `undefined` |
| `show`      | `show`       |             | `boolean` | `false`     |
| `source`    | `source`     |             | `string`  | `undefined` |
| `sourceId`  | `source-id`  |             | `string`  | `undefined` |
| `summary`   | `summary`    |             | `string`  | `undefined` |
| `thumbnail` | `thumbnail`  |             | `string`  | `undefined` |


## Events

| Event             | Description | Type               |
| ----------------- | ----------- | ------------------ |
| `depictedChanged` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [ve-depicts](../ve-depicts)

### Depends on

- [ve-wikidata-search](../ve-wikidata-search)
- [ve-depicts](../ve-depicts)

### Graph
```mermaid
graph TD;
  ve-depicts-dialog --> ve-wikidata-search
  ve-depicts-dialog --> ve-depicts
  ve-depicts --> ve-depicts-dialog
  style ve-depicts-dialog fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
