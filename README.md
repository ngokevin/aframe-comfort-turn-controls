## aframe-comfort-turn-controls

Comfort turn controls for [A-Frame](https://aframe.io).

### Properties

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
|          |             |               |

### Usage

#### Browser Installation

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.2.0/aframe.min.js"></script>
  <script src="https://rawgit.com/ngokevin/aframe-comfort-turn-controls/master/dist/aframe-comfort-turn-controls.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity controls="rotation: comfort-turn-controls hmd-controls"></a-entity>
  </a-scene>
</body>
```

#### NPM Installation

Install via NPM:

```bash
npm install aframe-comfort-turn-controls
```

Then register and use.

```js
require('aframe');
require('aframe-comfort-turn-controls');
```
