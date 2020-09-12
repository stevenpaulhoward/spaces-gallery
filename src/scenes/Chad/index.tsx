import React, { Suspense, useCallback, useRef, useState } from "react";
import { Physics } from "use-cannon";
import { Canvas } from "react-three-fiber";
import Player from "core/Player";
import { SceneComponent } from "types/scene";

import Analytics from "ui-components/Analytics";
import Effects from "core/Effects";
import ChadGallery from "models/ChadGallery";
import ChadPiece from "./components/ChadPiece";
import ChadLighting from "./components/ChadLighting";
import ChadSceneSelector from "./components/ChadSceneSelector";
import PlatformPlatform from "./components/PlatformPlatform";
import { Sky, Stars } from "drei";
import { Color } from "three";
import ToggleEffect from "three-components/ToggleEffect";
import { Raycaster, Vector3 } from "three";
import ChadMusic from "./components/ChadMusic";
import ChadEntrance from "./components/ChadEntrance";
import Signs from "./components/Signs";

const physicsProps = {
  iterations: 20,
  size: 10,
  allowSleep: false,
  defaultContactMaterial: {
    friction: 0,
  },
};

export const CHAD_COLOR = new Color(0x28fa92);
export const CHAD_COLOR2 = 0x28fa92;

type SCENE_TYPES = "gallery" | "falling" | "piece" | "ending";

const Chad: SceneComponent = (props) => {
  const { useEnvStore, defaultCanvasProps, children } = props;

  const [sceneState, setSceneState] = useState<SCENE_TYPES>("gallery");

  const isGallery = sceneState === "gallery" || sceneState === "ending";

  const [lockControls, setLockControls] = useState(false);
  const [bubble, setBubble] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [lok, setLok] = useState(false);
  const [time, setTime] = useState(false);
  const [color, setColor] = useState(false);

  const effects = { bubble, rotate, lok, time, color };

  const onFrame = useCallback(
    (bodyApi: any) => {
      if (sceneState === "falling") {
        setLockControls(true);
        bodyApi.position.set(0, 90, 0);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("piece"), 100);
        setTimeout(() => setLockControls(false), 2000);
      }

      if (sceneState === "ending") {
        bodyApi.position.set(0, 90, 30);
        bodyApi.velocity.set(0, -0.1, 0);
        setTimeout(() => setSceneState("gallery"), 100);
      }
    },
    [sceneState]
  );

  const raycaster = useRef(new Raycaster(new Vector3(), new Vector3(), 0, 3));

  return (
    <>
      <Analytics />
      <Canvas {...defaultCanvasProps} camera={{ far: 150 }}>
        {children}
        {time ? (
          <Sky distance={60000} />
        ) : (
          <Stars radius={30} depth={50} count={1000} factor={2} fade />
        )}
        <Physics {...physicsProps}>
          {/* @ts-ignore */}
          <Player
            useEnvStore={useEnvStore}
            initPos={[-2, -3, 62]}
            initLook={[-2, -3, -100]}
            onFrame={onFrame}
            raycaster={raycaster}
            lockControls={lockControls}
          />
          <ChadLighting time={time} />
          <ChadSceneSelector
            useEnvStore={useEnvStore}
            sceneState={sceneState}
            setSceneState={setSceneState}
          />
          <ChadPiece
            useEnvStore={useEnvStore}
            isGallery={isGallery}
            effects={effects}
          />
          <group position={[0, 0, 23]}>
            <ChadMusic
              useEnvStore={useEnvStore}
              url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/harris+cole+mix.mp3"
            />
          </group>
          <Effects />
          {sceneState === "gallery" && (
            <>
              {/*{time ? <Sky distance={60000} /> : <></>}*/}
              <Suspense fallback={null}>
                <ChadGallery useEnvStore={useEnvStore} />
              </Suspense>
              <ChadEntrance useEnvStore={useEnvStore} raycaster={raycaster} />
              <Signs />
              <ToggleEffect
                position={[25, 4, 1.5]}
                raycaster={raycaster}
                effect={color}
                setEffect={setColor}
                color="blue"
              />
              <ToggleEffect
                position={[-25, 4, 1.5]}
                raycaster={raycaster}
                effect={lok}
                setEffect={setLok}
                color="purple"
              />
              <ToggleEffect
                position={[-25, -4, 1.5]}
                raycaster={raycaster}
                effect={time}
                setEffect={setTime}
                color="white"
              />
              <ToggleEffect
                position={[25, -4, 1.5]}
                raycaster={raycaster}
                effect={rotate}
                setEffect={setRotate}
                color="orange"
              />
            </>
          )}
          {sceneState === "piece" && (
            <>
              <PlatformPlatform />
            </>
          )}
        </Physics>
      </Canvas>
    </>
  );
};

export default Chad;
