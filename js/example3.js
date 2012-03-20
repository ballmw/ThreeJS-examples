(function() {
  var Example3,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Example3 = (function() {
    var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, camera, renderer, scene, sphere;

    function Example3() {
      this.key_down = __bind(this.key_down, this);
      this.mouse_up = __bind(this.mouse_up, this);
      this.mouse_down = __bind(this.mouse_down, this);
    }

    scene = null;

    camera = null;

    renderer = null;

    sphere = null;

    WIDTH = 800;

    HEIGHT = 600;

    VIEW_ANGLE = 45;

    ASPECT = WIDTH / HEIGHT;

    NEAR = 0.1;

    FAR = 10000;

    Example3.prototype.init = function() {
      var ball, ballGeometry, ballMaterial, container, element, pointLight, radius, rings, segments, sphereGeometry, sphereMaterial;
      this.rotationX = 0;
      this.mouseXOnMouseDown = 0;
      this.targetRotationOnMouseDownX = 0;
      this.targetRotationX = 0;
      this.mouseYOnMouseDown = 0;
      this.targetRotationOnMouseDownY = 0;
      this.targetRotationY = 0;
      this.mouseX = 0;
      this.mouseY = 0;
      container = $('#example3');
      this.renderer = new THREE.WebGLRenderer({
        antialias: false
      });
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.camera.position.z = 250;
      this.scene = new THREE.Scene({});
      this.renderer.setSize(WIDTH, HEIGHT);
      element = this.renderer.domElement;
      container.append(element);
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
      ballMaterial = new THREE.MeshLambertMaterial({
        color: 0xCCCCCC
      });
      radius = 10;
      ballGeometry = new THREE.SphereGeometry(radius, segments, rings);
      ball = new THREE.Mesh(ballGeometry, ballMaterial);
      ball.position.y = 10;
      ball.position.z = 10;
      ball.position.x = 10;
      this.scene.add(ball);
      pointLight = new THREE.PointLight(0xFFFFFF);
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 130;
      this.scene.add(pointLight);
      this.camera.lookAt(this.scene.position);
      element.addEventListener('mousedown', this.mouse_down, false);
      element.addEventListener('mouseup', this.mouse_up, false);
      $('#example3').keydown(this.key_down);
      return null;
    };

    Example3.prototype.render = function() {
      if (this.mouseXOnMouseDown > -1) {
        this.rotationX = this.rotationX + (this.mouseX - this.mouseXOnMouseDown) * 0.02;
        this.sphere.rotation.y = this.rotationX;
      }
      return this.renderer.render(this.scene, this.camera);
    };

    Example3.prototype.mouse_down = function(event) {
      event.preventDefault;
      this.mouseXOnMouseDown = event.offsetY;
      return this.mouseX = event.offsetY;
    };

    Example3.prototype.mouse_up = function(event) {
      event.preventDefault;
      return this.mouseX = event.offsetY;
    };

    Example3.prototype.key_down = function(event) {
      event.preventDefault();
      console.log('key_down' + event.keyCode);
      if (event.keyCode === 37) this.camera.rotation.y -= .1;
      if (event.keyCode === 39) this.camera.rotation.y += .1;
      if (event.keyCode === 38) this.camera.rotation.x += .1;
      if (event.keyCode === 40) return this.camera.rotation.x -= .1;
    };

    return Example3;

  })();

  $(function() {
    var animate, example3;
    example3 = new Example3;
    example3.init();
    animate = function() {
      requestAnimationFrame(animate);
      return example3.render();
    };
    animate();
    return null;
  });

}).call(this);
