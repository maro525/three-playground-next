import { useFrame , useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Box3, DirectionalLight, Mesh, MeshNormalMaterial, PCFShadowMap, PlaneBufferGeometry, Raycaster, RectAreaLight, Vector2, Vector3 } from "three"
import { Triangle } from "./triangle"

const TriangleView = () => {

  const { scene, gl, camera } = useThree()

  useEffect(() => init(), [])
  useFrame(() => update())

  const c = useRef({
    mouse: new Vector2,
    raycaster: new Raycaster,
    plane: null,
    triangle: null
  })

  const init = () => {

    camera.position.set(0, 0, 6);
    camera.lookAt(scene.position);

    gl.shadowMap.enabled = true
    gl.shadowMap.type = PCFShadowMap

    // ============================================================
    // light
    // ------------------------------------------------------------

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

    // ==============================================================
    // triangle
    // ---------------------------------------------------------------

    const triangle = new Triangle(
      0, 0, 0, 2,
      {
        h: Math.random(),
        s: 0.5,
        l: 0.5
      },
      scene
    )
    c.current.triangle = triangle

    // ==============================
    // plane
    // ------------------------------
    const plane = new Mesh(
      new PlaneBufferGeometry(100, 100),
      new MeshNormalMaterial(),
    );
    c.current.plane = plane
    scene.add(plane)

    window.addEventListener("pointermove", onMouseMove, false)
  }

  const update = () => {
    const t = performance.now()

    c.current.raycaster.setFromCamera(
      c.current.mouse, camera
    )
    const intersects = c.current.raycaster.intersectObject(
      c.current.plane
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

    c.current.triangle.update(point, point2)
  }

  const onMouseMove = (event) => {
    c.current.mouse.x =
      (event.clientX / window.innerWidth) * 2 - 1;
    c.current.mouse.y =
      -(event.clientX / window.innerWidth) * 2 + 1;
  }

  return null
}

export default TriangleView
