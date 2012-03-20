class Example3
  scene = null
  camera = null
  renderer = null
  sphere = null
  
  WIDTH = 800
  HEIGHT = 600
  VIEW_ANGLE = 45
  ASPECT = WIDTH / HEIGHT
  NEAR = 0.1
  FAR = 10000
  
  
  
  init : -> 
    this.rotationX = 0
    this.mouseXOnMouseDown = 0
    this.targetRotationOnMouseDownX = 0
    this.targetRotationX = 0
    
    this.mouseYOnMouseDown = 0
    this.targetRotationOnMouseDownY = 0
    this.targetRotationY = 0
    this.mouseX =0;
    this.mouseY =0;

    # set some camera attributes

    # get the DOM element to attach to
    # - assume we've got jQuery to hand
    container = $ '#example3'

    # create a WebGL renderer, camera
    # and a scene
    this.renderer = new THREE.WebGLRenderer { antialias: false }
    #this.renderer = new THREE.CanvasRenderer
    this.camera = new THREE.PerspectiveCamera  VIEW_ANGLE, ASPECT, NEAR, FAR
    
    # the camera starts at 0,0,0 so pull it back
    this.camera.position.z = 250
        
    this.scene = new THREE.Scene {}
    
    # start the renderer
    this.renderer.setSize WIDTH, HEIGHT

    # attach the render-supplied DOM element
    element = this.renderer.domElement
    container.append element 
    
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
    
    ballMaterial = new THREE.MeshLambertMaterial { color: 0xCCCCCC }
    radius = 10
    ballGeometry = new THREE.SphereGeometry radius, segments, rings
    ball = new THREE.Mesh ballGeometry, ballMaterial
    ball.position.y = 10;
    ball.position.z = 10;
    ball.position.x = 10;
    
    this.scene.add ball
      
    # create a point light
    pointLight = new THREE.PointLight 0xFFFFFF

    # set its position
    pointLight.position.x = 10
    pointLight.position.y = 50
    pointLight.position.z = 130

    # add to the scene
    this.scene.add pointLight
    
    this.camera.lookAt this.scene.position
    
    element.addEventListener 'mousedown', this.mouse_down, false
    element.addEventListener 'mouseup', this.mouse_up, false
    $('#example3').keydown this.key_down
    null
    
  render: ->
    
    if(this.mouseXOnMouseDown > -1)
      this.rotationX =  this.rotationX + ( this.mouseX - this.mouseXOnMouseDown  ) * 0.02;
    #( this.targetRotationX - this.sphere.rotation.x ) * 0.05
      #rotationY = this.mouseYOnMouseDown - this.mouseY;
    #( this.targetRotationY - this.sphere.rotation.y ) * 0.05
    #console.log rotationX
    #console.log rotationY
      #console.log this.rotationX
      this.sphere.rotation.y = (this.rotationX)
    #this.sphere.rotation.z = rotationY

    this.renderer.render this.scene, this.camera
        
  mouse_down : ( event ) =>
  #  console.log 'mouse_start'
    event.preventDefault
  #    
    this.mouseXOnMouseDown = event.offsetY
    this.mouseX = event.offsetY
    #console.log this.mouseYOnMouseDown
  #  this.mouseYOnMouseDown = event.offsetY - HEIGHT/2

   mouse_up : ( event ) =>
     #console.log 'mouse_move'
     event.preventDefault
     #this.mouseXOnMouseDown = this.mouseX
     #this.mouseYOnMouseDown = this.mouseY
     this.mouseX = event.offsetY
     #console.log this.mouseX
     #this.mouseY = event.offsetY
     
   key_down : (event) =>
     event.preventDefault()
     console.log 'key_down' + event.keyCode
     if(event.keyCode==37) #left
       this.camera.rotation.y -= .1
     if(event.keyCode==39) #right
       this.camera.rotation.y += .1
     if(event.keyCode==38) #up
       this.camera.rotation.x += .1
     if(event.keyCode==40) #down
       this.camera.rotation.x -= .1
     
     
$ -> 
  example3 = new Example3
  example3.init()
  animate = ->
    requestAnimationFrame animate
    example3.render()
    
  animate()
  
  
  null
