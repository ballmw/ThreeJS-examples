'use strict';

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// shim layer with setTimeout fallback
window['requestAnimFrame'] = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function() {
  
  var projector, renderer, scene, light, camera,
    initScene, render, main, updateBoxes,
    createBox, now, lastbox = 0, boxes = [];
  
  initScene = function() {
    var collisionConfiguration, dispatcher, overlappingPairCache, solver, // Ammo world
      ground, groundShape, groundTransform, groundMass, localInertia, motionState, rbInfo, groundAmmo;
    
    
    // Projector
    projector = new THREE.Projector();
    
    
    // Renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById( 'viewport' ).appendChild( renderer.domElement );
    
    
    // Scene
    scene = new THREE.Scene();
    
    
    // Light
    light = new THREE.DirectionalLight( 0xFFFFFF );
    light.position.set( 40, 40, 25 );
    light.target.position.copy( scene.position );
    light.castShadow = true;
    light.shadowCameraLeft = -25;
    light.shadowCameraTop = -25;
    light.shadowCameraRight = 25;
    light.shadowCameraBottom = 25;
    light.shadowBias = -.0001
    scene.add( light );
    
    
    // Ammo world
    collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
    dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
    overlappingPairCache = new Ammo.btDbvtBroadphase();
    solver = new Ammo.btSequentialImpulseConstraintSolver();
    scene.world = new Ammo.btDiscreteDynamicsWorld( dispatcher, overlappingPairCache, solver, collisionConfiguration );
    scene.world.setGravity(new Ammo.btVector3(0, -12, 0));
    
    
    // Camera
    camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set( 60, 50, 60 );
    camera.lookAt( scene.position );
    scene.add( camera );
    
    
    // Ground
    ground = new THREE.Mesh(
      new THREE.PlaneGeometry( 50, 50 ),
      new THREE.MeshLambertMaterial({ color: 0xDDDDDD })
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    scene.add( ground );
    
    
    // Ground physics
    groundShape = new Ammo.btBoxShape(new Ammo.btVector3( 25, 1, 25 ));
    groundTransform = new Ammo.btTransform();
    groundTransform.setIdentity();
    groundTransform.setOrigin(new Ammo.btVector3( 0, -1, 0 ));
    
    groundMass = 0;
    localInertia = new Ammo.btVector3(0, 0, 0);
    motionState = new Ammo.btDefaultMotionState( groundTransform );
    rbInfo = new Ammo.btRigidBodyConstructionInfo( groundMass, motionState, groundShape, localInertia );
    groundAmmo = new Ammo.btRigidBody( rbInfo );
    scene.world.addRigidBody( groundAmmo );
  };
  
  createBox = function() {
    var box, position_x, position_z,
      mass, startTransform, localInertia, boxShape, motionState, rbInfo, boxAmmo;
    
    position_x = Math.random() * 10 - 5;
    position_z = Math.random() * 10 - 5;
    
    // Create 3D box model
    /*
    box = new THREE.Mesh(
      new THREE.CubeGeometry( 3, 3, 3),
      new THREE.MeshLambertMaterial({ opacity: 0, transparent: true })
    );
    box.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
    box.castShadow = true;
    box.receiveShadow = true;
    box.useQuaternion = true;
    scene.add( box );
    */
    
   
      box = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), new THREE.MeshLambertMaterial({color: 0xCCCCCC}));
      box.material.color.setRGB( Math.random() * 100 / 100, Math.random() * 100 / 100, Math.random() * 100 / 100 );
      box.castShadow = true;
      box.receiveShadow = true;
      box.useQuaternion = true;
      scene.add(box);
    
    
    new TWEEN.Tween(box.material).to({opacity: 1}, 500).start();
    
    // Create box physics model
    mass = 3 * 3 * 3;
    startTransform = new Ammo.btTransform();
    startTransform.setIdentity();
    startTransform.setOrigin(new Ammo.btVector3( position_x, 20, position_z ));
    
    localInertia = new Ammo.btVector3(0, 0, 0);
    
    boxShape = new Ammo.btSphereShape(3);
    boxShape.calculateLocalInertia( mass, localInertia );
    
    motionState = new Ammo.btDefaultMotionState( startTransform );
    rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, boxShape, localInertia );
    boxAmmo = new Ammo.btRigidBody( rbInfo );
    scene.world.addRigidBody( boxAmmo );
    
    boxAmmo.mesh = box;
    boxes.push( boxAmmo );
  };
  
  updateBoxes = function() {
    scene.world.stepSimulation( 1 / 60, 5 );
    var i, transform = new Ammo.btTransform(), origin, rotation;
    
    for ( i = 0; i < boxes.length; i++ ) {
      boxes[i].getMotionState().getWorldTransform( transform );
      
      origin = transform.getOrigin();
      boxes[i].mesh.position.x = origin.x();
      boxes[i].mesh.position.y = origin.y();
      boxes[i].mesh.position.z = origin.z();
      
      rotation = transform.getRotation();
      boxes[i].mesh.quaternion.x = rotation.x();
      boxes[i].mesh.quaternion.y = rotation.y();
      boxes[i].mesh.quaternion.z = rotation.z();
      boxes[i].mesh.quaternion.w = rotation.w();
    };
  };
  
  render = function render() {
    renderer.render(scene, camera);
  };
  
  main = function main() {
    
    // Create a new box every second
    now = new Date().getTime();
    if ( now - lastbox > 1000 ) {
      createBox();
      lastbox = now;
    }
    
    // Run physics
    updateBoxes();
    
    render();
    window.requestAnimFrame(main);
  };
  
  window.onload = function() {
    initScene();
    TWEEN.start();
    requestAnimFrame(main);
  }
  
})();