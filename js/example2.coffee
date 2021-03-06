class Example2
  scene = null
  camera = null
  renderer = null
  sphere = null
  
  WIDTH = 400
  HEIGHT = 300
  VIEW_ANGLE = 45
  ASPECT = WIDTH / HEIGHT
  NEAR = 0.1
  FAR = 10000
  
  
  init : -> 
    test = 0 

    this.mouseXOnMouseDown = 0
    this.targetRotationOnMouseDownX = 0
    this.targetRotationX = 0
    
    this.mouseYOnMouseDown = 0
    this.targetRotationOnMouseDownY = 0
    this.targetRotationY = 0

    # set some camera attributes

    # get the DOM element to attach to
    # - assume we've got jQuery to hand
    container = $ '#example2'

    # create a WebGL renderer, camera
    # and a scene
    this.renderer = new THREE.WebGLRenderer { antialias: false }
    #this.renderer = new THREE.CanvasRenderer
    this.camera = new THREE.PerspectiveCamera  VIEW_ANGLE, ASPECT, NEAR, FAR
    
    # the camera starts at 0,0,0 so pull it back
    this.camera.position.z = 150
        
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
    
    element.addEventListener 'mousedown', this.touch_start, false
    element.addEventListener 'mouseup', this.touch_move, false
    
    document.ontouchmove = (e) ->
      console.log 'prevent move' 
      e.preventDefault
    document.ontouchstart = (e) -> 
      e.preventDefault
    
    null
    
  render: ->
    this.renderer.render this.scene, this.camera
    null
        
$ -> 
  example2 = new Example2
  example2.init()
  animate = ->
    requestAnimationFrame animate
    example2.render()
    
  animate()
  
  null
