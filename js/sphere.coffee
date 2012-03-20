class Examples
  scene = null
  camera = null
  renderer = null
  sphere = null
  
  WIDTH = 770
  HEIGHT = 900
  VIEW_ANGLE = 45
  ASPECT = WIDTH / HEIGHT
  NEAR = 0.1
  FAR = 10000
  
  
  example1 : -> 

    this.mouseXOnMouseDown = 0
    this.targetRotationOnMouseDownX = 0
    this.targetRotationX = 0
    
    this.mouseYOnMouseDown = 0
    this.targetRotationOnMouseDownY = 0
    this.targetRotationY = 0
    
    this.targetRotationZ = 0
    
    this.startScale = 0
    this.startRotation = 0
    
    this.scale = 190

    # set some camera attributes

    # get the DOM element to attach to
    # Got jQuery?
    #container = $ '#sphere'

    #console.log 'got sphere div'
    #console.log container

    # create a WebGL renderer, camera
    # and a scene
    #this.renderer = new THREE.WebGLRenderer { antialias: false }
    this.renderer = new THREE.CanvasRenderer
    this.camera = new THREE.PerspectiveCamera  VIEW_ANGLE, ASPECT, NEAR, FAR
    
    # the camera starts at 0,0,0 so pull it back
    this.camera.position.z = this.scale
        
    this.scene = new THREE.Scene {}
    
    # start the renderer
    this.renderer.setSize WIDTH, HEIGHT

    # attach the render-supplied DOM element
    this.element = this.renderer.domElement
    
    # set up the sphere vars
    radius = 50
    segments = 16
    rings = 16
    
    # create a new mesh with sphere geometry -
    # we will cover the sphereMaterial next!
    sphereGeometry = new THREE.SphereGeometry radius, segments, rings
    sphereMaterial = new THREE.MeshBasicMaterial { color: 0xCC0000, shading: THREE.FlatShading, wireframe: true }
    
    this.sphere = new THREE.Mesh sphereGeometry, sphereMaterial
    #sphere.position.y = 150
    
    # add the sphere to the scene
    this.scene.add this.sphere
    
    #I have no idea what I'm doing; Try a bunch of shit...  Lambert???
    #ballMaterial = new THREE.MeshLambertMaterial { color: 0xCCCCCC }
    #radius = 10
    #ballGeometry = new THREE.SphereGeometry radius, segments, rings
    #ball = new THREE.Mesh ballGeometry, ballMaterial
    #ball.position.y = 10;
    #ball.position.z = 10;
    #ball.position.x = 10;
    
    #this.scene.add ball
      
    # create a point light
    pointLight = new THREE.PointLight 0xFFFFFF

    # set its position
    pointLight.position.x = 10
    pointLight.position.y = 50
    pointLight.position.z = 130

    # add to the scene
    this.scene.add pointLight
    
    this.camera.lookAt this.scene.position
    
    this.element.addEventListener 'touchstart', this.touch_start, false
    this.element.addEventListener 'touchmove', this.touch_move, false
    #this.element.addEventListener 'gesturestart', this.gesture_start, false
    this.element.addEventListener 'gesturechange', this.gesture_change, false
    
    #document.ontouchmove = (e) ->
    #  console.log 'prevent move' 
    #  e.preventDefault
    #document.ontouchstart = (e) -> 
    #  e.preventDefault
    
    null
    
  render: ->
    rotationX = ( this.targetRotationX - this.sphere.rotation.x ) * 0.05
    rotationY = ( this.targetRotationY - this.sphere.rotation.y ) * 0.05
    rotationZ = ( this.targetRotationZ - this.sphere.rotation.z ) * 0.05
    #console.log rotationX
    #console.log rotationY
    this.sphere.rotation.y = rotationX
    this.sphere.rotation.x = rotationY 
    this.sphere.rotation.z = rotationZ

    this.camera.position.z = this.scale

    this.renderer.render this.scene, this.camera
    null
        
  touch_start : ( event ) =>
    #console.log 'touch_start'
    event.preventDefault
    if event.touches.length == 1
      this.mouseXOnMouseDown = event.touches[ 0 ].pageX - WIDTH/2
      this.mouseYOnMouseDown = event.touches[ 0 ].pageY - HEIGHT/2
      this.targetRotationOnMouseDownX = this.targetRotationX;
      this.targetRotationOnMouseDownY = this.targetRotationY;

   touch_move : ( event ) =>
     #console.log 'touch_move'
     event.preventDefault
     if event.touches.length == 1
       mouseX = event.touches[ 0 ].pageX - WIDTH/2;
       mouseY = event.touches[ 0 ].pageY - WIDTH/2;
       this.targetRotationX = this.targetRotationOnMouseDownX + ( mouseX - this.mouseXOnMouseDown ) * 0.05;
       this.targetRotationY = this.targetRotationOnMouseDownY + ( mouseY - this.mouseYOnMouseDown ) * 0.05;
       #this.render()
   
   gesture_start : ( event ) =>
     #console.log 'gesture start'
     event.preventDefault
   
   gesture_change : ( event ) =>
     event.preventDefault
     #console.log 'gesture change'
     console.log 'scale(' + event.scale  + this.startScale  + ') rotate(' + event.rotation + this.startRotation + 'deg)';
     this.targetRotationZ = event.rotation * -0.5
     z = this.camera.position.z
     scale = (1/event.scale)
     if(z < 100)
       z = 100 * scale
     else if(z > 200)
       z = 200 * scale
     else
       z = z * scale
     
     this.scale = z  
     
     

$ -> 
  App.Examples = Examples
  null
