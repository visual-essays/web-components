# ve-entities



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `annotations` | `annotations` |             | `string` | `undefined` |


## Events

| Event                     | Description | Type                  |
| ------------------------- | ----------- | --------------------- |
| `closeAnnotationsBrowser` |             | `CustomEvent<any>`    |
| `zoomToRegion`            |             | `CustomEvent<string>` |


## Dependencies

### Used by

 - [ve-image](../ve-image)

### Graph
```mermaid
graph TD;
  ve-image --> ve-image-annotations-browser
  style ve-image-annotations-browser fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
