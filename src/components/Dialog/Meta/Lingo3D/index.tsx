import React, { useEffect, useRef, useState } from 'react'

import {
  Cube,
  Dummy,
  Find,
  HTML,
  keyboard,
  Model,
  Reticle,
  ThirdPersonCamera,
  useLoop,
  usePreload,
  useSpring,
  useWindowSize,
  World,
} from 'lingo3d-react'

import type { Dummy as GameDummy } from 'lingo3d'

import { useAppSelector } from '@store/index'

import { STATIC } from '@api/config'

import './index.less'

const path = (name: string): string => `${STATIC}/model/${name}`

export default (): JSX.Element => {
  const progress = usePreload(
    [
      path('env.hdr'),
      path('gallery.glb'),
      path('kazama.fbx'),
      path('Idle.fbx'),
    ],
    '40.7mb'
  )

  const { friend, dataChannel } = useAppSelector((store) => store.webRTC)
  const { nickname } = useAppSelector((store) => store.user)

  const [walking, setWalking] = useState(false)
  const [mouseOver, setMouseOver] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const camX = mouseOver ? 50 : 0
  const camY = mouseOver ? 100 : 100
  const camZ = mouseOver ? 100 : 300

  // Camera spring animation
  // 相机的弹簧动画
  const xSpring = useSpring({ to: camX, bounce: 0 })
  const ySpring = useSpring({ to: camY, bounce: 0 })
  const zSpring = useSpring({ to: camZ, bounce: 0 })

  // adjust camera FOV based on window size
  // 根据窗口大小调整相机的FOV
  const windowSize = useWindowSize()
  const fov = windowSize.width < windowSize.height ? 100 : 90

  const dummyRef = useRef<GameDummy>(null)
  const remoteRef = useRef<GameDummy>(null)

  useLoop(() => {
    const dummy = remoteRef.current
    if (!dummy) return
    dummy.moveForward(-1)
  }, walking)

  // keyboard WASD controls
  // 键盘WASD控制
  useEffect(() => {
    keyboard.onKeyPress = (_, keys) => {
      const dummy = dummyRef.current
      if (!dummy) return

      if (keys.has('w')) {
        dummy.strideForward = -1
      } else if (keys.has('s')) {
        dummy.strideForward = 1
      } else if (keys.has('a')) {
        dummy.strideRight = 1
      } else if (keys.has('d')) {
        dummy.strideRight = -1
      } else {
        dummy.strideForward = 0
        dummy.strideRight = 0
      }

      const { x, y, z } = dummy

      const value = JSON.stringify({ x, y, z })
      dataChannel?.send(value)
    }
  }, [])

  useEffect(() => {
    dataChannel?.addEventListener('message', (event) => {
      const position = JSON.parse(event.data)

      if (position.y === 0) return
      const { x, y, z } = position
      remoteRef.current?.lookAt({ x, y, z })
      setPosition({ x, y, z })
      setWalking(true)
    })
  }, [])

  const handleIntersect = () => {
    setWalking(false)
  }

  return (
    <>
      {progress < 100 ? (
        <div className="meta_loading">loading {Math.floor(progress)}%</div>
      ) : (
        <World
          defaultLight={path('env.hdr')}
          skybox={path('env.hdr')}
          bloom
          // bloomStrength={0.3}
          bloomRadius={1}
          bloomThreshold={0.8}
          repulsion={1}
        >
          {/* gallery model */}
          {/* 艺术馆模型 */}
          <Model src={path('gallery.glb')} scale={20} physics="map">
            {/* find the artwork of name "a6_CRN.a6_0" */}
            {/* 找到名称为 "a6_CRN.a6_0" 的艺术品 */}
            <Find
              name="a6_CRN.a6_0"
              // when mouse is over artwork, set mouseOver state, which will trigger camera spring animation and artwork outline
              // 当鼠标移到艺术品上，改变mouseOver状态，触发相机弹簧动画和艺术品轮廓
              outline={mouseOver}
              onMouseOver={() => setMouseOver(true)}
              onMouseOut={() => setMouseOver(false)}
            >
              {/* <HTML>
                <img
                  style={{ width: '100px', height: '100px' }}
                  src="https://ipfs.io/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"
                  alt=""
                />
              </HTML> */}
            </Find>
          </Model>

          {/* Dummy character, and the camera that tracks it */}
          {/* 角色模型，以及追踪它的相机 */}
          <ThirdPersonCamera
            mouseControl
            active
            innerY={ySpring}
            innerZ={zSpring}
            innerX={xSpring}
            fov={fov}
            lockTargetRotation="dynamic-lock"
          >
            <Dummy
              ref={dummyRef}
              physics="character"
              x={243.19}
              y={-900}
              z={-577.26}
              roughnessFactor={0}
              metalnessFactor={0.3}
              src={path('kazama.fbx')}
              animations={{
                idle: path('Idle.fbx'),
                running: path('Walking.fbx'),
              }}
              strideMove
            >
              <HTML>
                <div className="player_name">{nickname}</div>
              </HTML>
            </Dummy>
          </ThirdPersonCamera>
          <Dummy
            ref={remoteRef}
            physics="character"
            x={243.19}
            y={-900}
            z={-577.26}
            roughnessFactor={0}
            metalnessFactor={0.3}
            animation={walking ? 'walking' : 'idle'}
            strideMove
            intersectIds={['cursor']}
            onIntersect={handleIntersect}
            src={path('kazama.fbx')}
            animations={{
              idle: path('Idle.fbx'),
              walking: path('Walking.fbx'),
            }}
          >
            <HTML>
              <div className="player_name">{friend?.name}</div>
            </HTML>
          </Dummy>

          {/* crosshair */}
          {/* 准星 */}
          <Reticle />
          <Cube
            id="cursor"
            visible={false}
            scale={0.5}
            x={position.x}
            y={position.y}
            z={position.z}
          />
        </World>
      )}
    </>
  )
}
