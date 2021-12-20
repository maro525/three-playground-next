import { useFrame , useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Box3, DirectionalLight, Mesh, MeshNormalMaterial, PCFShadowMap, PlaneBufferGeometry, Raycaster, RectAreaLight, Vector2, Vector3 } from "@/utils/3d/three.module"
import { Triangle } from "./triangle"
import { clamp } from "@/utils"

const TriangleView = () => {

  const { scene, gl, camera } = useThree()

  useEffect(() => init(), [])
  useFrame(() => update())


  const vars = useRef({
    triangles: [],
    mouse: new Vector2,
    raycaster: new Raycaster,
    plane: null
  })

  const init = () => {

    camera.position.set(0, 0, 6);
    camera.lookAt(scene.position);

    gl.shadowMap.enabled = true
    gl.shadowMap.type = PCFShadowMap

    const rectLight1 = new RectAreaLight(0xffffff, 10, 4, 10);
    rectLight1.position.set(5, 5, 5)
    scene.add(rectLight1)

    const directionalLight1 = new DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight1)
    directionalLight1.shadow.bias = -0.001

    const directionalLight2 = new DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight2)
    directionalLight2.position.set(-6, 4, 4)
    directionalLight2.castShadow = true

    const directionalLight3 = new DirectionalLight(0xffffff, 0.5);
    scene.add(directionalLight3)
    directionalLight3.position.set(2, -4, 6)
    directionalLight3.castShadow = true

    const triangle = new Triangle(0, 0, 0, 2, {
      h: Math.random(),
      s: 0.5,
      l: 0.5
    })

    const bb = new Box3()

    for (const triangle of vars.current.triangles) {
      const mesh = triangle.toMesh()
      if (mesh) {
        mesh.castShadow = mesh.receiveShadow = true;
        scene.add(mesh)
        bb.expandByObject(mesh)
      }
    }

    const plane = new Mesh(
      new PlaneBufferGeometry(100, 100),
      new MeshNormalMaterial,
    );
    vars.current.plane = plane
    scene.add(plane)


    window.addEventListener("pointermove", onMouseMove, false)
  }

  const update = () => {
    const t = performance.now()

    vars.current.raycaster.setFromCamera(
      vars.current.mouse, camera
    )
    const intersects = vars.current.raycaster.intersectObject(
      vars.current.plane
    )

    let point;
    if (intersects.length) {
      point = intersects[0].point;
    }

    const point2 = new Vector3(
      2 * Math.cos(t / 800), 
      2 * Math.sin(t / 1100),
      0
    )

    for (let i=0; i < vars.current.triangles.length; i++) {
      const d1 = clamp(
        vars.current.triangles[i].center.distanceTo(point),
        0.000001,
        10000000
      )
      const d2 = clamp(
        vars.current.triangles[i].center.distanceTo(point2),
        0.000001,
        1000000
      )
      const s = clamp(1 / d1 ** 20 + 1 / d2 ** 20, 0, 1);
      vars.current.triangles[i].mesh.scele.set(s, s, 1)
    }
  }

  // functions
  const onMouseMove = (event) => {
    vars.current.mouse.x = 
      (event.clientX / window.innerWidth) * 2 - 1;
    vars.current.mouse.y =
      -(event.clientX / window.innerWidth) * 2 + 1;
  }


  return null

}

export default TriangleView
