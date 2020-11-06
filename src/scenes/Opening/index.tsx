import React, { Suspense, useState } from "react";
import Logo from "@spacesvr/components/Logo";

import SpacesGallery from "scenes/Opening/models/SpacesGallery";
import SpacesPlaques from "scenes/Opening/models/SpacesPlaques";
import { useAnalytics } from "services/analytics";
import RobertRoom from "./components/rooms/RobertRoom";
import HDRI from "@spacesvr/components/HDRI";
import ZachRoom from "./components/rooms/ZachRoom";
import DennisRoom from "./components/rooms/DennisRoom";
import OutsideLighting from "./components/rooms/OutsideLighting";
import HectorRoom from "./components/rooms/HectorRoom";
import JustinRoom from "./components/rooms/JustinRoom";
import OutsideAudio from "./components/rooms/OutsideAudio";
import SantiRoom from "./components/rooms/SantiRoom";
import { Vector3, WebGLRenderer } from "three";
import StandardEnvironment from "@spacesvr/core/environments/StandardEnvironment";

const Opening = () => {
  const [renderer] = useState<WebGLRenderer>();

  const initAngle = Math.PI * 0.4;
  const RADIUS = 7;

  const INIT_POS = new Vector3(
    Math.cos(initAngle) * RADIUS,
    1,
    Math.sin(initAngle) * RADIUS
  );
  const INIT_ROT = initAngle + Math.PI;

  useAnalytics();

  return (
    <StandardEnvironment player={{ pos: INIT_POS, rot: INIT_ROT }}>
      <HDRI src="https://d27rt3a60hh1lx.cloudfront.net/images/hdriuno.hdr" />
      <RobertRoom />
      <HectorRoom />
      <ZachRoom />
      <JustinRoom />
      <SantiRoom renderer={renderer} />
      <DennisRoom />
      <Logo floating rotating position={[0, 1.25, 0]} />
      <OutsideAudio
        url="https://spaces-gallery-assets.s3-us-west-1.amazonaws.com/audio/LucidMondayMix.mp3"
        position={[0, 0, 0]}
      />
      <OutsideLighting />
      <Suspense fallback={null}>
        <SpacesGallery />
      </Suspense>
      <Suspense fallback={null}>
        <SpacesPlaques />
      </Suspense>
    </StandardEnvironment>
  );
};

export default Opening;
