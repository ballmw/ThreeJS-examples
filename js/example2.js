(function() {
  var Example2;

  Example2 = (function() {
    var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, camera, renderer, scene, sphere;

    function Example2() {}

    scene = null;

    camera = null;

    renderer = null;

    sphere = null;

    WIDTH = 400;

    HEIGHT = 300;

    VIEW_ANGLE = 45;

    ASPECT = WIDTH / HEIGHT;

    NEAR = 0.1;

    FAR = 10000;

    Example2.prototype.init = function() {
      var ball, ballGeometry, ballMaterial, container, element, pointLight, radius, rings, segments, sphereGeometry, sphereMaterial, test;
      test = 0;
      this.mouseXOnMouseDown = 0;
      this.targetRotationOnMouseDownX = 0;
      this.targetRotationX = 0;
      this.mouseYOnMouseDown = 0;
      this.targetRotationOnMouseDownY = 0;
      this.targetRotationY = 0;
      container = $('#example2');
      this.renderer = new THREE.WebGLRenderer({
        antialias: false
      });
      this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
      this.camera.position.z = 150;
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
      element.addEventListener('mousedown', this.touch_start, false);
      element.addEventListener('mouseup', this.touch_move, false);
      document.ontouchmove = function(e) {
        console.log('prevent move');
        return e.preventDefault;
      };
      document.ontouchstart = function(e) {
        return e.preventDefault;
      };
      return null;
    };

    Example2.prototype.render = function() {
      this.renderer.render(this.scene, this.camera);
      return null;
    };

    return Example2;

  })();

  $(function() {
    var animate, example2;
    example2 = new Example2;
    example2.init();
    animate = function() {
      requestAnimationFrame(animate);
      return example2.render();
    };
    animate();
    return null;
  });

}).call(this);
