import React, { useRef, useEffect, MutableRefObject } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { Quaternion, Raycaster, Vector3 } from "three";
import { Event, useSphere } from "@react-three/cannon";
import { isMobile } from "react-device-detect";

import MobileControls from "../controls/MobileControls";
import DesktopControls from "../controls/DesktopControls";
import { DeviceOrientationControls } from "three/examples/jsm/controls/DeviceOrientationControls";
import { EnvironmentStoreHook } from "@spacesvr/core/stores/environment";
import RaycasterUtil from "../utils/RaycasterUtil";
import MouseFPSCamera from "../controls/MouseFPSCamera";

const VELOCITY_FACTOR = 250;
const SHOW_PLAYER_HITBOX = false;

type ShirtsPlayerProps = {
  useEnvStore: EnvironmentStoreHook;
  initPos?: [number, number, number];
  initLook?: [number, number, number];
  raycaster?: MutableRefObject<Raycaster>;
  onFrame?: (bodyApi: any) => void;
  lockControls?: boolean;
  fixedPath: boolean;
};

/**
 * Player represents a physics-enabled player in the environment, complete with a
 * control scheme and a physical representation that interacts with other physics-
 * enabled objects.
 *
 * There should only be one player per environment.
 *
 * @constructor
 */
const ShirtsPlayer = (props: ShirtsPlayerProps) => {
  const {
    useEnvStore,
    initPos = [0, 2, 0],
    initLook = [0, 2, 0],
    raycaster,
    onFrame,
    lockControls,
    fixedPath = true,
  } = props;
  const { camera } = useThree();

  // get pause status
  const paused = useEnvStore((st) => st.paused);

  // physical body
  const [bodyRef, bodyApi] = useSphere(() => ({
    mass: 500,
    position: initPos,
    args: 1,
    fixedRotation: true,
    onCollide: (e: Event) => {
      if (e?.body?.name.includes("teleport")) {
        const coords = e.body.name.replace("teleport-", "").split(",");
        const x = parseInt(coords[0]);
        const y = parseInt(coords[1]);
        const z = parseInt(coords[2]);
        position.current = new Vector3(x, y, z);
        bodyApi.position.set(x, y, z);
      }
    },
  }));

  const controls = useRef<DeviceOrientationControls>();

  // refs
  const prevTime = useRef(performance.now());

  // producer
  const position = useRef(new Vector3(0, 0, 0));
  const velocity = useRef(new Vector3(0, 0, 0));

  // consumer
  const direction = useRef(new Vector3());
  const quaternion = useRef(new Quaternion(0, 0, 0, 0)); // rad on y axis

  useEffect(() => {
    // store position and velocity
    bodyApi.position.subscribe((p) => {
      position.current.set(p[0], p[1], p[2]);
    });
    bodyApi.velocity.subscribe((v) => velocity.current.set(v[0], v[1], v[2]));
    camera?.lookAt(initLook[0], initLook[1], initLook[2]);

    if (isMobile) {
      window.addEventListener("click", () => {
        controls.current = new DeviceOrientationControls(camera);
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (isMobile && controls.current) {
      controls.current.update();
    }

    if (fixedPath) {
      const dist = (22 + 50) / 2;
      const x = dist * Math.cos(clock.getElapsedTime() / 10);
      const z = dist * Math.sin(clock.getElapsedTime() / 10);
      camera.position.set(x, 2, z);
      return;
    }

    if (onFrame) {
      onFrame(bodyApi);
    }

    // update time
    const time = performance.now();

    if (!paused) {
      // get time since last computation
      const delta = (time - prevTime.current) / 1000;

      // get forward/back movement and left/right movement velocities
      const inputVelocity = new Vector3(0, 0, 0);
      if (!lockControls) {
        inputVelocity.x = direction.current.x * delta * 0.75 * VELOCITY_FACTOR;
        inputVelocity.z = direction.current.y * delta * VELOCITY_FACTOR;
      }

      // apply quaternion to get adjusted direction based on camera
      const moveQuaternion = quaternion.current.clone();
      moveQuaternion.x = 0;
      moveQuaternion.z = 0;
      inputVelocity.applyQuaternion(moveQuaternion);

      // keep y velocity intact
      inputVelocity.add(new Vector3(0, velocity.current.y, 0));

      // update velocity
      bodyApi?.velocity.set(inputVelocity.x, inputVelocity.y, inputVelocity.z);
    } else {
      // stop player from moving when paused
      bodyApi?.velocity.set(0, 0, 0);
    }

    // update prev time
    prevTime.current = time;
  });

  return (
    <>
      {isMobile ? (
        <>
          {!fixedPath && (
            <MobileControls
              quaternion={quaternion}
              position={position}
              useEnvStore={useEnvStore}
              direction={direction}
            />
          )}
        </>
      ) : (
        <>
          <MouseFPSCamera
            quaternion={quaternion}
            position={position}
            useEnvStore={useEnvStore}
          />
          <DesktopControls
            quaternion={quaternion}
            position={position}
            useEnvStore={useEnvStore}
            direction={direction}
          />
        </>
      )}
      {raycaster && raycaster.current && (
        <RaycasterUtil
          quaternion={quaternion}
          position={position}
          raycaster={raycaster}
        />
      )}
      <mesh ref={bodyRef} name="player">
        {SHOW_PLAYER_HITBOX && (
          <>
            <sphereBufferGeometry attach="geometry" args={[1]} />
            <meshPhongMaterial attach="material" color="#172017" />
          </>
        )}
      </mesh>
    </>
  );
};

export default ShirtsPlayer;
