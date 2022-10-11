import { Mesh, MeshBasicMaterial, RingGeometry } from "three";


///*
// *  Creates a simple circular marker mesh to overlay on scanned planes.
// */
//class PlaneMarker
//{
//    protected Geometry: RingGeometry;

//    protected Material: MeshBasicMaterial;

//    GeometryMesh: Mesh;

//    Sides: number; 

//    Color: number;


//    SetSides(sides: number)
//    {
//        if (sides < 1) {  
//            this.Sides = 1;
//        }
//        else if (sides > 30) {
//            this.Sides = 30;
//        }
//        else
//        {
//            this.Sides = sides;
//        }
//    }

//    GetMesh(): Mesh
//    {
//        this.GeometryMesh = new Mesh(this.Geometry, this.Material);
//        this.GeometryMesh.matrixAutoUpdate = false;

//        return this.GeometryMesh;
//    }

//    constructor(sides: number, color: number = 0xffffff)
//    {
//        this.SetSides(sides);
//        this.Color = color;

//        this.Material = new MeshBasicMaterial({ color: this.Color });
//        this.Geometry = new RingGeometry(0.14, 0.15, this.Sides);
            
//        this.GetMesh();
        
//    }
//} 

export function createPlaneMarker() {
  const planeMarkerMaterial = new MeshBasicMaterial({ color: 0xffffff });
  
  const planeMarkerGeometry = new RingGeometry(0.14, 0.15, 16).rotateX(
    -Math.PI / 2,
  );

  const planeMarker = new Mesh(planeMarkerGeometry, planeMarkerMaterial);

  planeMarker.matrixAutoUpdate = false;

  return planeMarker;
}
