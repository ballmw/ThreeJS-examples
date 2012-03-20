(function() {
  var Example1;

  Example1 = (function() {
    var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, camera, renderer, scene, sphere;

    function Example1() {}

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

    Example1.prototype.init = function() {
      var container, element, pointLight, radius, rings, segments, sphereGeometry, sphereMaterial;
      this.mouseXOnMouseDown = 0;
      this.targetRotationOnMouseDownX = 1;
      this.targetRotationX = 0;
      this.mouseYOnMouseDown = 0;
      this.targetRotationOnMouseDownY = 0;
      this.targetRotationY = 0;
      container = $('#example1');
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
      pointLight = new THREE.PointLight(0xFFFFFF);
      pointLight.position.x = 10;
      pointLight.position.y = 50;
      pointLight.position.z = 130;
      this.scene.add(pointLight);
      this.camera.lookAt(this.scene.position);
      return null;
    };

    Example1.prototype.render = function() {
      this.renderer.render(this.scene, this.camera);
      return null;
    };

    return Example1;

  })();

  $(function() {
    var animate, example1;
    example1 = new Example1;
    example1.init();
    animate = function() {
      requestAnimationFrame(animate);
      return example1.render();
    };
    animate();
    return null;
  });

}).call(this);
