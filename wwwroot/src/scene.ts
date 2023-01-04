import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createPlaneMarker } from "./objects/PlaneMarker";
import { handleXRHitTest } from "./utils/hitTest";
import {
  AmbientLight,
  Mesh,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
  PlaneGeometry,
  MeshBasicMaterial,
  TextureLoader
} from "three";
import {GlobalData} from "./global";

import { Tools } from "./utils/Tools";
    
// Cube augmentation code

// export function createScene(renderer: WebGLRenderer) {
//   const scene = new Scene()

//   const camera = new PerspectiveCamera(
//     70,
//     window.innerWidth / window.innerHeight,
//     0.02,
//     20,
//   )

//   const geometry = new BoxBufferGeometry(1, 1, 1);
//   const material = new MeshBasicMaterial({ color: 0x00ff00 });
//   const cube = new Mesh(geometry, material);
//   cube.position.z = -4;

//   scene.add(cube);

//   const renderLoop = (timestamp: number, frame?: XRFrame) => {
//     // Rotate cube
//     cube.rotation.y += 0.01;
//     cube.rotation.x += 0.01;

//     if (renderer.xr.isPresenting) {
//       renderer.render(scene, camera);
//     }
//   }
  
//   renderer.setAnimationLoop(renderLoop);
// };


// Custom 3D model augmentation



GlobalData.DefaultDeviceInfo = GlobalData.GetDeviceInfo();

alert(JSON.stringify(GlobalData.DefaultDeviceInfo));

class Point2D
{
  public X: number;
  public Y: number;

  public constructor(x: number, y: number)
  /**/{
    this.X  = x;
    this.Y = y;
  }
}

class Object
{
    public GeometryMesh: Mesh;
    
    public GetMesh(): Mesh
    {
        return this.GeometryMesh;
    }
    
    constructor() 
    {
        this.GeometryMesh = new Mesh();
    }
}

class Plane extends Object
{
    private Geometry: PlaneGeometry;

    public Texture: MeshBasicMaterial;

    public GeometryMesh: Mesh;

    public Dimensions: Point2D;

    /*
     * Loads a texture from the provided file path
     */
    protected SetTexture(filePath: string): MeshBasicMaterial
    {
        return (this.Texture = new MeshBasicMaterial({
            map: new TextureLoader().load(filePath)
        }));
    }

    public GetMesh(): Mesh
    {
        return (this.GeometryMesh = new Mesh(this.Geometry, this.Texture));
    }

    public constructor(dimensions: Point2D, texturePath: string)
    {
        super();
        this.Dimensions = dimensions;
        this.Geometry = new PlaneGeometry(this.Dimensions.X, this.Dimensions.Y);
        this.Texture = this.SetTexture(texturePath);
        this.GeometryMesh = new Mesh();
        this.GetMesh();
    }
}

export function createScene(renderer: WebGLRenderer, textureID: string) {
  const scene = new Scene();
  
  const camera = new PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    20);

  /**
   * Add some simple ambient lights to illuminate the model.
   */
  const ambientLight = new AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);
    
  /*
   * Create the plane marker to show on tracked surfaces.
   */
  // const planeMarker: Mesh = new Plane(new Point2D(1, 1),"assets/rug.jpg").GeometryMesh;
  // planeMarker.rotateX(-Math.PI / 2);
  //scene.add(planeMarker);
        
  const plane: Mesh = createPlaneMarker(); //new Plane(new Point2D(1 / 4, 1 / 4),"assets/rug.jpg").GeometryMesh;

  var instance: Mesh = new Plane(new Point2D(1, 2), GlobalData.GetDefaultTextureMaterialPath(textureID)).GeometryMesh;

  instance.rotateX(-Math.PI / 2);
  instance.rotateZ(-Math.PI / 8);
  instance.translateY(-5);
  instance.visible = false;

  scene.add(instance);
  scene.add(plane);
  /**
   * Setup the controller to get input from the XR space.
   */
  const controller = renderer.xr.getController(0);
  scene.add(controller);

  controller.addEventListener("select", onSelect);

  /**   
   * The onSelect function is called whenever we tap the screen
   * in XR mode.
   */
  function onSelect()
  {
    if (plane.visible)
    {
      // Place the model on the spot where the marker is showing.

      instance.visible = true;
      instance.position.setFromMatrixPosition(plane.matrix);
      // Rotate the model    to give a bit of variation.
      plane.rotation.y = Math.random() * (Math.PI * 2);
    }
  }

  /**
   * Called whenever a new hit test result is ready.
   * 
   */
  function onHitTestResultReady(hitPoseTransformed: Float32Array)
  {
    if (hitPoseTransformed)
    {
      plane.visible = true;
        plane.matrix.fromArray(hitPoseTransformed);
    }
  }

  /**
   * Called whenever the hit test is empty/unsuccesful.
   */
  function onHitTestResultEmpty()
  {
      plane.visible = false;
  }

  /**
   * The main render loop.
   *
   * This is where we perform hit-tests and update the scene
   * whenever anything changes.
   */
  const renderLoop = (timestamp: any, frame?: XRFrame) => {
    renderer.render(scene, camera);
    if (renderer.xr.isPresenting)
    {
      if (frame) {
        handleXRHitTest(
          renderer,
          frame,
          onHitTestResultReady,
          onHitTestResultEmpty  ,
        );
      }
      renderer.render(scene, camera);
    }
  };

  renderer.setAnimationLoop(renderLoop);
}
