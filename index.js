if (typeof AFRAME === 'undefined') {
  throw new Error('Controls attempted to register before AFRAME was available.');
}

// Tiny KeyboardEvent.code polyfill.
var KEYCODE_TO_CODE = {
  '37': 'ArrowLeft',
  '39': 'ArrowRight',
  '65': 'KeyA',
  '68': 'KeyD'
};

var DPAD_LEFT = 14;
var DPAD_RIGHT = 15;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

AFRAME.registerControls('comfort-turn-gamepad-controls', {
  schema: {
    degrees: {default: 30},
    enabled: {default: true},
    controller: {default: 1, oneOf: [1, 2, 3, 4]}
  },

  /**
   * Init handler. Called during scene initialization and is only run once.
   * Controls can use this to set initial state.
   */
  init: function () {
    this.angle = undefined;
    this.gamepad = null;
    this.rotation = this.el.getComputedAttribute('rotation');
  },

  /**
   * Update handler.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   */
  update: function () {
    this.angle = THREE.Math.degToRad(this.data.degrees);
    this.gamepad = navigator.getGamepads && navigator.getGamepads()[this.data.num - 1];
  },

  /**
   * Returns true if the control is actively in use.
   * @type {boolean}
   */
  isRotationActive: function () {
    if (!this.data.enabled || !this.gamepad || !this.gamepad.connected) { return false; }
    return gamepad.buttons[DPAD_LEFT].pressed || gamepad.buttons[DPAD_RIGHT].pressed;
  },

  /**
   * Returns an incremental THREE.Vector2 rotation change, with X and Y rotation values.
   * To be calibrated, values should be on the range [-1,1].
   * @returns {THREE.Vector2}
   */
  getRotationDelta: function () {
    if (gamepad.buttons[DPAD_LEFT].pressed) {
      return new THREE.Vector2(0, -1 * this.angle);
    } else if (gamepad.buttons[DPAD_RIGHT].pressed) {
      return new THREE.Vector2(0, this.angle);
    }
  }
});

AFRAME.registerControls('comfort-turn-keyboard-controls', {
  schema: {
    degrees: {default: 30},
    enabled: {default: true}
  },

  /**
   * Init handler. Called during scene initialization and is only run once.
   * Controls can use this to set initial state.
   */
  init: function () {
    this.angle = undefined;
    this.keysPressed = {};
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  },

  /**
   * Update handler.
   * Called whenever component's data changes.
   * Also called on component initialization when the component receives initial data.
   */
  update: function () {
    this.angle = THREE.Math.degToRad(this.data.degrees);
  },

  remove: function () {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  },

  onKeyDown: function (event) {
    var rotation = this.el.getComputedAttribute('rotation');
    this.keysPressed[event.keyCode] = true;
    if (this.keysPressed[KEY_LEFT]) {
      rotation.y += this.data.degrees;
    } else if (this.keysPressed[KEY_RIGHT]) {
      rotation.y -= this.data.degrees;
    }
    this.rotation = rotation;
  },

  onKeyUp: function (event) {
    delete this.keysPressed[event.keyCode];
  },

  /**
   * Returns true if the control is actively in use.
   * @type {boolean}
   */
  isRotationActive: function () {
    var keysPressed = this.keysPressed;
    if (!this.data.enabled) { return false; }
    return keysPressed[KEY_LEFT] || keysPressed[KEY_RIGHT];
  },

  getRotation: function () {
    return this.rotation;
  }
});
