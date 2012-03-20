(function() {
  var Examples,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Examples = (function() {
    var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, camera, renderer, scene, sphere;

    function Examples() {
      this.gesture_change = __bind(this.gesture_change, this);
      this.gesture_start = __bind(this.gesture_start, this);
      this.touch_move = __bind(this.touch_move, this);
      this.touch_start = __bind(this.touch_start, this);
    }

    scene = null;

    camera = null;

    renderer = null;

    sphere = null;

    WIDTH = 770;

    HEIGHT = 900;

    VIEW_ANGLE = 45;

    ASPECT = WIDTH / HEIGHT;

    NEAR = 0.1;

    FAR = 10000;

    Examples.prototype.example1 = function() {
      var pointLight, radius, rings, segments, sphereGeometry, sphereMaterial;
      this.mouseXOnMouseDown = 0;
      this.targetRotationOnMouseDownX = 0;
      this.targetRotationX = 0;
      this.mouseYOnMouseDown = 0;
      this.targetRotationOnMouseDownY = 0;
      this.targetRotationY = 0;
      this.targetRotationZ = 0;
      this.startScale = 0;
      this.startRotation = 0;
      this.scale = 190;
      this.renderer = new THREE.CanvasRenderer;
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.camera.position.z = this.scale;
      this.scene = new THREE.Scene({});
      this.renderer.setSize(WIDTH, HEIGHT);
      this.element = this.renderer.domElement;
      radius = 50;
      segments = 16;
      rings = 16;
      sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
      sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xCC0000,
        shading: THREE.FlatShading,
        wireframe: true
      });
      this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      this.scene.add(this.sphere);
      pointLight = new THREE.PointLight(0xFFFFFF);
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 130;
      this.scene.add(pointLight);
      this.camera.lookAt(this.scene.position);
      this.element.addEventListener('touchstart', this.touch_start, false);
      this.element.addEventListener('touchmove', this.touch_move, false);
      this.element.addEventListener('gesturechange', this.gesture_change, false);
      return null;
    };

    Examples.prototype.render = function() {
      var rotationX, rotationY, rotationZ;
      rotationX = (this.targetRotationX - this.sphere.rotation.x) * 0.05;
      rotationY = (this.targetRotationY - this.sphere.rotation.y) * 0.05;
      rotationZ = (this.targetRotationZ - this.sphere.rotation.z) * 0.05;
      this.sphere.rotation.y = rotationX;
      this.sphere.rotation.x = rotationY;
      this.sphere.rotation.z = rotationZ;
      this.camera.position.z = this.scale;
      this.renderer.render(this.scene, this.camera);
      return null;
    };

    Examples.prototype.touch_start = function(event) {
      event.preventDefault;
      if (event.touches.length === 1) {
        this.mouseXOnMouseDown = event.touches[0].pageX - WIDTH / 2;
        this.mouseYOnMouseDown = event.touches[0].pageY - HEIGHT / 2;
        this.targetRotationOnMouseDownX = this.targetRotationX;
        return this.targetRotationOnMouseDownY = this.targetRotationY;
      }
    };

    Examples.prototype.touch_move = function(event) {
      var mouseX, mouseY;
      event.preventDefault;
      if (event.touches.length === 1) {
        mouseX = event.touches[0].pageX - WIDTH / 2;
        mouseY = event.touches[0].pageY - WIDTH / 2;
        this.targetRotationX = this.targetRotationOnMouseDownX + (mouseX - this.mouseXOnMouseDown) * 0.05;
        return this.targetRotationY = this.targetRotationOnMouseDownY + (mouseY - this.mouseYOnMouseDown) * 0.05;
      }
    };

    Examples.prototype.gesture_start = function(event) {
      return event.preventDefault;
    };

    Examples.prototype.gesture_change = function(event) {
      var scale, z;
      event.preventDefault;
      console.log('scale(' + event.scale + this.startScale + ') rotate(' + event.rotation + this.startRotation + 'deg)');
      this.targetRotationZ = event.rotation * -0.5;
      z = this.camera.position.z;
      scale = 1 / event.scale;
      if (z < 100) {
        z = 100 * scale;
      } else if (z > 200) {
        z = 200 * scale;
      } else {
        z = z * scale;
      }
      return this.scale = z;
    };

    return Examples;

  })();

  $(function() {
    App.Examples = Examples;
    return null;
  });

}).call(this);
