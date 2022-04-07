import { createPlaneMarker } from "./objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

class Point2D
{
  public X: number;
  public Y: number;

  public constructor(x: number, y: number)
  {
    this.X  = x;
    this.Y = y;
  }
}


class Plane
{
    private Geometry: PlaneGeometry;

    public Texture: MeshBasicMaterial;

    public GeometryMesh: Mesh;

    /*
     * Loads a texture from the provided file path
     */
    private LoadTexture(filePath: string)
    {
      var textureLoader: TextureLoader = new TextureLoader();

      this.Texture = new MeshBasicMaterial({
        map: textureLoader.load(filePath)
      });

      return this.Texture;
    }

    public GetMesh(): Mesh
    {
      return (this.GeometryMesh = new Mesh(this.Geometry, this.Texture));
    }

    public constructor(dimensions: Point2D, texturePath: string)
    {
      this.Geometry = new PlaneGeometry(dimensions.X, dimensions.Y);
      this.Texture = this.LoadTexture(texturePath);
      this.GeometryMesh = this.GetMesh();
    }
}

export function createScene(renderer: WebGLRenderer) {
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

  /**
   * Load the gLTF model and assign result to variable.
   */
  const gltfLoader = new GLTFLoader();

  let carModel: Object3D;

  gltfLoader.load("assets/models/sports_car.glb", (gltf: GLTF) => {
    carModel = gltf.scene.children[0];
  });

  /**
   * Create the plane marker to show on tracked surfaces.
   */
  // const planeMarker: Mesh = new Plane(new Point2D(1, 1),"assets/rug.jpg").GeometryMesh;
  // planeMarker.rotateX(-Math.PI / 2);
  //scene.add(planeMarker);

  const planeCircle: Mesh = new Plane(new Point2D(1, 1),"assets/rug.jpg").GeometryMesh;

  scene.add(planeCircle);

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
    if (planeCircle.visible)
    {
      // Place the model on the spot where the marker is showing.
      // planeMarker.position.setFromMatrixPosition(planeCircle.matrix);

      // Rotate the model randomly to give a bit of variation.
      // planeCircle.rotation.y = Math.random() * (Math.PI * 2);
      //planeMarker.visible = true;

      //scene.add(planeMarker);
    }
  }

  /**
   * Called whenever a new hit test result is ready.
   */
  function onHitTestResultReady(hitPoseTransformed: Float32Array)
  {
    if (hitPoseTransformed)
    {
      planeCircle.visible = true;
      planeCircle.matrix.fromArray(hitPoseTransformed);
    }
  }

  /**
   * Called whenever the hit test is empty/unsuccesful.
   */
  function onHitTestResultEmpty() {
      planeCircle.visible = true;
  }

  /**
   * The main render loop.
   *
   * This is where we perform hit-tests and update the scene
   * whenever anything changes.
   */
  const renderLoop = (timestamp: any, frame?: XRFrame) => {
    if (renderer.xr.isPresenting)
    {
      // if (frame) {
      //   handleXRHitTest(
      //     renderer,
      //     frame,
      //     onHitTestResultReady,
      //     onHitTestResultEmpty,
      //   );
      // }
      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(renderLoop);
  }
}
