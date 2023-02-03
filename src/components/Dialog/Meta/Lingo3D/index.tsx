import React, { useEffect, useRef, useState } from 'react'

import {
  Cube,
  Dummy,
  Find,
  HTML,
  keyboard,
  Model,
  Plane,
  Reticle,
  ThirdPersonCamera,
  useLoop,
  usePreload,
  useSpring,
  useWindowSize,
  World,
  HTMLMesh,
} from 'lingo3d-react'

import { useSnackbar } from 'notistack'

import { useAppSelector, useAppDispatch } from '@store/index'
import {
  setAnswerChannel,
  Play,
  // removePlay,
  addPlay,
  setConnected,
  setModel,
} from '@store/modules/room'

import { NFTS } from '@constants/exhibition'

import { STATIC } from '@api/config'

import { getImgWH } from '@utils/index'
import { offer } from '@utils/webRTC'

import type {
  Dummy as GameDummy,
  ThirdPersonCamera as GameThirdPersonCamera,
  HTMLMesh as GameHTMLMesh,
} from 'lingo3d'

import './index.less'

import { VolumeUp } from '@mui/icons-material'

type aniModelVal = { idle: string, walking: string }

const path = (name: string): string => `${STATIC}/model/${name}`
const initX = 165
const initY = -360
const initZ = -186
const fbxs = ['kazama.fbx', 'ARASHI.fbx', 'AYA.fbx']
const aniModel: Record<string, aniModelVal> = {
  'kazama.fbx': {
    idle: 'Idle.fbx',
    walking: 'Walking.fbx'
  },
  'ARASHI.fbx': {
    idle: 'ARASHI_Idle.fbx',
    walking: 'ARASHI_Walking.fbx'
  },
  'AYA.fbx': {
    idle: 'Idle.fbx',
    walking: 'Walking.fbx'
  },
}

const dancers = [
  {
    dancer: 'MIYU.fbx',
    dance: 'MIYU_Dance.fbx',
    x: -560,
    y: initY,
    z: -220,
    lookAt: [8000, 0, 0],
  },
  {
    dancer: 'NANA.fbx',
    dance: 'NANA_Dance.fbx',
    x: -30,
    y: initY,
    z: -690,
    lookAt: [0, 0, 8000],
  },
  {
    dancer: 'SHO.fbx',
    dance: 'SHO_Dance.fbx',
    x: -33,
    y: initY,
    z: 248,
    lookAt: [0, 0, -8000],
  },
]

interface Position {
  x: number
  y: number
  z: number
}

export default (): JSX.Element => {
  let timer: NodeJS.Timeout | undefined

  const modules = [...fbxs, ...fbxs, ...fbxs, ...fbxs, ...fbxs]

  const progress = usePreload(
    [
      path('env.hdr'),
      path('galleryBK.glb'),
      path('kazama.fbx'),
      path('ARASHI.fbx'),
      path('AYA.fbx'),
      path('Idle.fbx'),
      path('Walking.fbx'),
      path('ARASHI_Idle.fbx'),
      path('ARASHI_Walking.fbx'),
      path('MIYU.fbx'),
      path('MIYU_Dance.fbx'),
      path('NANA.fbx'),
      path('NANA_Dance.fbx'),
      path('SHO.fbx'),
      path('SHO_Dance.fbx'),
    ],
    '62mb'
  )

  const { enqueueSnackbar } = useSnackbar()

  const { nickname, socket } = useAppSelector((store) => store.user)
  const { playes, room, initPlays } = useAppSelector((store) => store.room)
  const { accountAddress } = useAppSelector((store) => store.wallet)

  const dispatch = useAppDispatch()

  const [position, setPosition] = useState<Record<string, Position>>({})
  const [walking, setWalking] = useState<Record<string, boolean>>({})
  const [talking, setTalking] = useState<Record<string, boolean>>({})

  // 玩家聚焦相框视角调整
  const [mouseOver, setMouseOver] = useState<boolean[]>(
    new Array(NFTS.length).fill(false)
  )
  const mouseOverState = mouseOver.some((item) => item)
  const camX = mouseOverState ? 50 : 0
  const camY = mouseOverState ? 100 : 100
  const camZ = mouseOverState ? 100 : 300
  const xSpring = useSpring({ to: camX, bounce: 0 })
  const ySpring = useSpring({ to: camY, bounce: 0 })
  const zSpring = useSpring({ to: camZ, bounce: 0 })
  const changeMouseOver = (index: number, state: boolean) => {
    const _mouseOver = [...mouseOver]
    _mouseOver.splice(index, 1, state)
    setMouseOver(_mouseOver)
  }

  // adjust camera FOV based on window size
  // 根据窗口大小调整相机的FOV
  const windowSize = useWindowSize()
  const fov = windowSize.width < windowSize.height ? 100 : 90

  const dummyRef = useRef<GameDummy>(null)
  const cameraRef = useRef<GameThirdPersonCamera>(null)
  const nameRef = useRef<GameHTMLMesh>(null)
  const remoteDummyRef = useRef<Record<string, GameDummy | null>>({})
  const remoteNameRef = useRef<Record<string, GameHTMLMesh | null>>({})
  const remoteAudioRef = useRef<Record<string, HTMLAudioElement | null>>({})

  // 其他玩家碰撞到位置后停止移动，并瞬移到结束的位置上
  const handleIntersect = (key: string) => {
    setTimeout(() => {
      const { x, y, z } = position[key]
      remoteDummyRef.current[key]!.x = x
      remoteDummyRef.current[key]!.y = y
      remoteDummyRef.current[key]!.z = z
    }, 300)
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      const _walking = { ...walking }
      _walking[key] = false
      setWalking(_walking)
    }, 300)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const message = (event: MessageEvent<any>) => {
    const { type, data } = JSON.parse(event.data)
    if (type === 'position') {
      const { x, y, z, key } = data
      remoteDummyRef.current[key]?.lookAt({ x, y, z })
      const _positions = { ...position }
      _positions[key] = { x, y, z }
      setPosition(_positions)
      const _walking = { ...walking }
      _walking[key] = true
      setWalking(_walking)
    } else if (type === 'init') {
      const { key, model, position } = data
      dispatch(setModel([key, model, position]))
    }
  }

  useEffect(() => {
    if (!room) return
    // nft
    NFTS.forEach(async (nft, index) => {
      const url = room.nft[index]
      const [width, height] = await getImgWH(url)
      nft.texture = url
      nft.width = width
      nft.height = height
    })

    // join online play
    initPlays.forEach(async (play) => {
      const media = { video: false, audio: true }
      const isMeta = true
      const toId = play.id
      const type = 'room'

      const { pc, dataChannel, localStream } = await offer({ media, isMeta })
      const _play: Play = {
        ...play,
        identity: 'answer',
        pc,
        dataChannel,
        localStream: localStream!,
        audioContext: new AudioContext(),
        stream: undefined,
        connected: false,
      }
      dispatch(addPlay(_play))

      pc.onicecandidate = (event) => {
        if (event.candidate)
          socket?.emit('candidate', {
            type,
            candidate: event.candidate,
            toId,
          })
      }

      socket?.emit('offer', {
        offer: pc.localDescription,
        toId,
        type,
        media,
        isMeta,
        play: {
          name: nickname,
          id: accountAddress
        },
      })
    })
  }, [])

  useEffect(() => {
    // 键盘WASD控制
    keyboard.onKeyPress = (_, keys) => {
      const dummy = dummyRef.current
      const speed = 2.4
      if (!dummy) return

      if (keys.has('w')) {
        dummy.strideForward = -speed
      } else if (keys.has('s')) {
        dummy.strideForward = speed
      } else if (keys.has('a')) {
        dummy.strideRight = speed
      } else if (keys.has('d')) {
        dummy.strideRight = -speed
      } else {
        dummy.strideForward = 0
        dummy.strideRight = 0
      }

      const { x, y, z } = dummy

      const data = {
        type: 'position',
        data: { x, y, z, key: accountAddress },
      }
      const value = JSON.stringify(data)
      Object.keys(playes).forEach((key) => {
        const play = playes[key]
        console.log(`send ${play?.name} type ${data.type}`)
        try {
          if (play && play.connected) play.dataChannel?.send(value)
        } catch (error) {

        }
      })
    }

    const keys = Object.keys(playes)
    keys.forEach((key) => {
      const play = playes[key]
      if (!play.pc) return
      play.pc.ondatachannel = (event) => {
        const dataChannel = event.channel
        if (!play.dataChannel) dispatch(setAnswerChannel({ key, dataChannel }))
      }

      if (play.dataChannel)
        play.dataChannel.onmessage = message

      if (play.pc?.connectionState !== 'connected' && play.candidate) {
        play.pc?.addIceCandidate(new RTCIceCandidate(play.candidate))
      }

      const _positions = { ...position }
      _positions[key] = { x: 0, y: 0, z: 0 }
      setPosition(_positions)
      const _walking = { ...walking }
      _walking[key] = false
      setWalking(_walking)
      const _talking = { ...talking }
      _talking[key] = false
      setTalking(_talking)

      // 音频
      if (remoteAudioRef.current[key] && play.stream) {
        const { stream, audioContext } = play
        remoteAudioRef.current[key]!.srcObject = stream

        // 音频收集
        const mediaStreamSource = audioContext.createMediaStreamSource(stream)
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1)
        mediaStreamSource.connect(scriptProcessor)
        scriptProcessor.connect(audioContext.destination)
        scriptProcessor.onaudioprocess = (e) => {
          const buffer = e.inputBuffer.getChannelData(0)
          // 获取缓冲区中最大的音量值
          // eslint-disable-next-line prefer-spread
          const maxVal = Math.max.apply(Math, buffer as unknown as number[])
          // 显示音量值
          const _talking = { ...talking }
          _talking[key] = Math.ceil(maxVal * 100) > 10
          setTalking({ ..._talking })
        }
      }
    })

  }, [playes])

  // 其他玩家移动帧
  useLoop(
    () => {
      Object.keys(walking).forEach((key) => {
        if (!walking[key]) return
        const dummy = remoteDummyRef.current[key]
        dummy?.moveForward(-2.3)
      })
    },
    Object.values(walking).some((walk) => walk)
  )
  useLoop(
    () => {
      const _playes = { ...playes }
      Object.keys(_playes).forEach((key) => {
        const play = playes[key]
        if (play.pc?.connectionState === 'connected' && !play.connected) {
          dispatch(setConnected(key))
          const data = {
            type: 'init',
            data: {
              key: accountAddress,
              model: modules[initPlays.length],
              position: {
                x: dummyRef.current ? dummyRef.current.x : initX,
                y: dummyRef.current ? dummyRef.current.y + 15 : initY,
                z: dummyRef.current ? dummyRef.current.z : initX,
              }
            }
          }
          play.dataChannel?.send(JSON.stringify(data))
          if (play.identity === 'offer') {
            enqueueSnackbar(`Join In ${play.name}`, {
              variant: 'success',
            })
          }
        }
      })
    },
    Object.values(playes).some((playe) => !playe.connected)
  )

  useLoop(() => {
    if (!cameraRef.current || !nameRef.current) return
    nameRef.current.lookAt(cameraRef.current)
    Object.values(remoteNameRef.current).forEach((remoteName) =>
      remoteName?.lookAt(cameraRef.current!)
    )
  }, true)

  return (
    <>
      {progress < 100 ? (
        <div className="meta_loading">loading {Math.floor(progress)}%</div>
      ) : (
        <World
          defaultLight={path('env.hdr')}
          skybox={path('env.hdr')}
          bloom
          // bloomStrength={0.2}
          bloomRadius={1}
          bloomThreshold={0.8}
          // repulsion={1}
          outlineColor="gold"
          outlineHiddenColor="white"
          outlinePulse={1000}
        >
          {/* gallery model */}
          {/* 艺术馆模型 */}
          <Model
            onClick={(e) => console.log(e.point)}
            metalnessFactor={-1.1}
            roughnessFactor={1.5}
            src={path('galleryBK.glb')}
            scale={10}
            physics="map"
          >
            {/* find the artwork of name "a6_CRN.a6_0" */}
            {/* 找到名称为 "a6_CRN.a6_0" 的艺术品 */}
            {NFTS.map((nft, index) => (
              <Find
                key={index}
                name={nft.name}
                outline={mouseOver[index]}
                onMouseOver={() => changeMouseOver(index, true)}
                onMouseOut={() => changeMouseOver(index, false)}
              >
                <Plane
                  texture={nft.texture}
                  z={nft.z}
                  rotationZ={180}
                  rotationX={nft.rotationX}
                />
                {mouseOver[index] && (
                  <HTML>
                    <div className="nft_big_img">
                      {nft.width > nft.height ? (
                        <img src={nft.texture} width={nft.width} />
                      ) : (
                        <img src={nft.texture} height={nft.height} />
                      )}
                    </div>
                  </HTML>
                )}
              </Find>
            ))}
          </Model>

          <ThirdPersonCamera
            ref={cameraRef}
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
              x={initX}
              y={initY}
              z={initZ}
              width={15}
              height={65}
              scale={2}
              lookAt={[-8000, 0, 0]}
              roughnessFactor={0}
              metalnessFactor={0.3}
              // src={path('kazama.fbx')}
              src={path(modules[initPlays.length])}
              animations={{
                idle: path(aniModel[modules[initPlays.length]].idle),
                running: path(aniModel[modules[initPlays.length]].walking),
              }}
              strideMove
            >
              <HTMLMesh ref={nameRef} y={42} scale={0.6}>
                <p style={{ fontSize: '12px' }}>{nickname}</p>
              </HTMLMesh>
            </Dummy>
          </ThirdPersonCamera>
          {/* 其他玩家 */}
          {Object.keys(playes).map((key) => {
            const play = playes[key]
            if (play.connected && play.model) {
              return (
                <Dummy
                  key={key}
                  ref={(el) => (remoteDummyRef.current[key] = el)}
                  physics="character"
                  x={play.position?.x}
                  y={play.position?.y}
                  z={play.position?.z}
                  width={15}
                  height={65}
                  scale={2}
                  roughnessFactor={0}
                  metalnessFactor={0.3}
                  animation={walking[key] ? 'walking' : 'idle'}
                  strideMove
                  intersectIds={[`cursor-${key}`]}
                  onIntersect={() => handleIntersect(key)}
                  src={path(play.model)}
                  animations={{
                    idle: path(aniModel[play.model].idle),
                    walking: path(aniModel[play.model].walking),
                  }}
                >
                  <HTML>
                    {talking[key] && <VolumeUp className="player_talk" />}
                    <audio
                      style={{
                        position: 'absolute',
                        left: '-2000px',
                        visibility: 'hidden',
                      }}
                      ref={(el) => (remoteAudioRef.current[key] = el)}
                      autoPlay
                    ></audio>
                  </HTML>
                  <div>
                    <HTMLMesh
                      ref={(el) => (remoteNameRef.current[key] = el)}
                      y={42}
                      scale={0.6}
                    >
                      <p style={{ fontSize: '12px' }}>{play.name}</p>
                    </HTMLMesh>
                  </div>
                </Dummy>
              )
            } else {
              return <Cube key={play.id + 'dummy'} visible={false} />
            }
          })}
          {/* 其他玩家移动位置 */}
          {Object.keys(playes).map((key) => {
            const play = playes[key]
            const connected = play.connected
            return (
              <Cube
                key={key}
                id={`cursor-${key}`}
                visible={false}
                scale={0.1}
                x={connected ? position[key].x : 0}
                y={connected ? position[key].y : 0}
                z={connected ? position[key].z : 0}
              />
            )
          })}
          {/* 准星 */}
          <Reticle />
          {/* 舞者 */}
          {
            dancers.map((dancer, index) =>
              <Dummy
                key={index}
                physics="character"
                x={dancer.x}
                y={dancer.y}
                z={dancer.z}
                width={15}
                height={65}
                scale={2}
                lookAt={dancer.lookAt}
                roughnessFactor={0}
                metalnessFactor={0.3}
                src={path(dancer.dancer)}
                animations={{
                  idle: path(dancer.dance),
                }}
                strideMove
              />
            )
          }
        </World>
      )}
    </>
  )
}