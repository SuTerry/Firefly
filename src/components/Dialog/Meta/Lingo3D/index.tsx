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
  removePlay,
  addPlay,
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

const path = (name: string): string => `${STATIC}/model/${name}`
const initX = 860
const initY = -360
const initZ = 994
const fbxs = ['kazama.fbx', 'ARASHI.fbx', 'AYA.fbx']

interface Position {
  x: number
  y: number
  z: number
}

interface Player extends Play {
  connected: boolean
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
    ],
    '30.9mb'
  )

  const { enqueueSnackbar } = useSnackbar()

  const { nickname, socket } = useAppSelector((store) => store.user)
  const { playes, room, initPlays } = useAppSelector((store) => store.room)
  const { accountAddress } = useAppSelector((store) => store.wallet)

  const dispatch = useAppDispatch()

  const [count, setCount] = useState<number>(0)
  const [position, setPosition] = useState<Record<string, Position>>({})
  const [walking, setWalking] = useState<Record<string, boolean>>({})
  const [players, setPlayers] = useState<Record<string, Player>>({})
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
    console.log('type', type)
    if (type === 'position') {
      const { x, y, z, key } = data
      remoteDummyRef.current[key]?.lookAt({ x, y, z })
      const _positions = { ...position }
      _positions[key] = { x, y, z }
      setPosition(_positions)
      const _walking = { ...walking }
      _walking[key] = true
      setWalking(_walking)
    } else if (type === 'out') {
      const { name, id } = data
      playOut(name, id)
    }
  }

  const playOut = (name: string, id: string) => {
    // players
    const _players = { ...players }
    delete _players[id]
    setPlayers({ ..._players })
    // position
    const _position = { ...position }
    delete _position[id]
    setPosition({ ..._position })
    // walking
    const _walking = { ...walking }
    delete _walking[id]
    setWalking({ ..._walking })
    // talking
    const _talking = { ...talking }
    delete _talking[id]
    setWalking({ ..._talking })
    // playes
    dispatch(removePlay(id))
    enqueueSnackbar(`${name} Out`, {
      variant: 'warning',
    })
    playes[id].dataChannel?.removeEventListener('message', message)
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

    console.log(initPlays, 'initPlays')

    // join online play
    initPlays.forEach(async (play) => {
      const media = { video: false, audio: true }
      const isMeta = true
      const toId = play.id
      const type = 'room'

      const { pc, dataChannel, localStream } = await offer({ media, isMeta })
      const _play: Play = {
        ...play,
        identity: 'offer',
        pc,
        dataChannel,
        localStream: localStream!,
        audioContext: new AudioContext(),
        stream: undefined,
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
        play: _play,
      })
    })
  }, [])

  useEffect(() => {
    let _count = 0
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
          if (play && players[key].connected) play.dataChannel?.send(value)
        } catch (error) {
          playOut(play.name, key)
        }
      })
    }

    const keys = Object.keys(playes)
    keys.forEach((key) => {
      const play = playes[key]
      play.pc.ondatachannel = (event) => {
        const dataChannel = event.channel
        if (!play.dataChannel) dispatch(setAnswerChannel({ key, dataChannel }))
      }

      if (play.dataChannel)
        play.dataChannel.onmessage = message

      const _positions = { ...position }
      _positions[key] = { x: 0, y: 0, z: 0 }
      setPosition(_positions)
      const _walking = { ...walking }
      _walking[key] = false
      setWalking(_walking)
      const _talking = { ...talking }
      _talking[key] = false
      setTalking(_talking)

      if (play.identity === 'answer') _count += 1
      if (play.pc.connectionState !== 'connected') return


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

    setCount(_count)
  }, [playes])

  // useEffect(() => {
  //   const keys = Object.keys(playes)
  //   const _players = { ...players }
  //   let update = false
  //   keys.forEach((key) => {
  //     const play = playes[key]

  //     if (_players.hasOwnProperty(key)) {
  //       // stream
  //       if (!_players[key].stream && play.stream) {
  //         _players[key].stream = play.stream
  //         update = true
  //       }
  //       // dataChannel
  //       if (!_players[key].dataChannel && play.dataChannel) {
  //         _players[key].dataChannel = play.dataChannel
  //         update = true
  //       }

  //       const { x, y, z } = play.initPosition || { x: 0, y: 0, z: 0 }
  //       if (x !== 0 && x !== 860 && !!remoteDummyRef.current[key]) {
  //         remoteDummyRef.current[key]!.x = x
  //         remoteDummyRef.current[key]!.y = y
  //         remoteDummyRef.current[key]!.z = z
  //         remoteDummyRef.current[key]?.lookAt({ x, y, z })
  //       }
  //       return
  //     }

  //     _players[key] = { ...play, connected: false }
  //     update = true

  //     // if (play.pc.connectionState !== 'connected') {
  //     if (play.identity === 'offer') {
  //       console.log(`send offer of ${play.name}`)
  //       const { x, y, z } = dummyRef.current || { x: 0, y: 0, z: 0 }
  //       roomOffer(play.friend, {
  //         offer: play.pc?.localDescription,
  //         position: { x, y, z },
  //       })
  //     } else {
  //       console.log(`send answer of ${play.friend.name}`)
  //       roomAnswer(play.friend, {
  //         answer: play.pc?.localDescription,
  //       })
  //     }
  //     play.pc.ondatachannel = (event) => {
  //       const dataChannel = event.channel
  //       if (!play.dataChannel) {
  //         console.log(`create dataChannel of ${play.name}`)
  //         dispatch(setAnswerChannel({ key, dataChannel }))
  //       }
  //     }

  //     const _positions = { ...position }
  //     _positions[key] = { x: 0, y: 0, z: 0 }
  //     setPosition(_positions)
  //     const _walking = { ...walking }
  //     _walking[key] = false
  //     setWalking(_walking)
  //     const _talking = { ...talking }
  //     _talking[key] = false
  //     setTalking(_talking)
  //     // }
  //   })

  //   if (update) setPlayers({ ..._players })
  // }, [playes])

  // useEffect(() => {
  //   let _count = 0
  //   // 键盘WASD控制
  //   keyboard.onKeyPress = (_, keys) => {
  //     const dummy = dummyRef.current
  //     const speed = 2.4
  //     if (!dummy) return

  //     if (keys.has('w')) {
  //       dummy.strideForward = -speed
  //     } else if (keys.has('s')) {
  //       dummy.strideForward = speed
  //     } else if (keys.has('a')) {
  //       dummy.strideRight = speed
  //     } else if (keys.has('d')) {
  //       dummy.strideRight = -speed
  //     } else {
  //       dummy.strideForward = 0
  //       dummy.strideRight = 0
  //     }

  //     const { x, y, z } = dummy

  //     const data = {
  //       type: 'position',
  //       data: { x, y, z, key: accountAddress },
  //     }
  //     const value = JSON.stringify(data)
  //     Object.keys(playes).forEach((key) => {
  //       const play = playes[key]
  //       console.log(`send ${play?.name} type ${data.type}`)
  //       try {
  //         if (play && players[key].connected) play.dataChannel?.send(value)
  //       } catch (error) {
  //         playOut(play.name, key)
  //       }
  //     })
  //   }

  //   Object.keys(players).forEach((key) => {
  //     if (players[key].identity === 'answer') _count += 1
  //     if (!players[key].connected) return

  //     // 接收其他玩家移动位置
  //     if (playes[key]) {
  //       console.log(playes[key].dataChannel, 'playes[key].dataChannel')
  //       playes[key].dataChannel?.addEventListener('message', message)
  //     }

  //     // 音频
  //     if (remoteAudioRef.current[key] && playes[key]) {
  //       const { stream, audioContext } = playes[key]
  //       if (!stream) return
  //       remoteAudioRef.current[key]!.srcObject = stream

  //       // 音频收集
  //       const mediaStreamSource = audioContext.createMediaStreamSource(stream)
  //       const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1)
  //       mediaStreamSource.connect(scriptProcessor)
  //       scriptProcessor.connect(audioContext.destination)
  //       scriptProcessor.onaudioprocess = (e) => {
  //         const buffer = e.inputBuffer.getChannelData(0)
  //         // 获取缓冲区中最大的音量值
  //         // eslint-disable-next-line prefer-spread
  //         const maxVal = Math.max.apply(Math, buffer as unknown as number[])
  //         // 显示音量值
  //         const _talking = { ...talking }
  //         _talking[key] = Math.ceil(maxVal * 100) > 10
  //         setTalking({ ..._talking })
  //       }
  //     }
  //   })

  //   setCount(_count)
  // }, [players])

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
      const _players = { ...players }
      let update = false
      Object.keys(_players).forEach((key) => {
        if (_players[key].connected) return
        if (playes[key].pc.connectionState === 'connected') {
          _players[key].connected = true
          update = true
          if (playes[key].identity === 'offer')
            enqueueSnackbar(`Join In ${playes[key].name}`, {
              variant: 'success',
            })
        }
      })
      if (update) setPlayers({ ..._players })
    },
    Object.values(players).some((player) => !player.connected)
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
            metalnessFactor={-1.1}
            onClick={(e) => console.log(e.point)}
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
              lookAt={[8000, 0, 0]}
              roughnessFactor={0}
              metalnessFactor={0.3}
              // src={path('kazama.fbx')}
              src={path(modules[initPlays.length])}
              animations={{
                idle: path('Idle.fbx'),
                running: path('Walking.fbx'),
              }}
              strideMove
            >
              <HTMLMesh ref={nameRef} y={42} scale={0.6}>
                <p style={{ fontSize: '12px' }}>{nickname}</p>
              </HTMLMesh>
            </Dummy>
          </ThirdPersonCamera>
          {/* 其他玩家 */}
          {Object.keys(playes).map((key, index) => {
            const play = playes[key]
            const _count = index < count ? index : index + 1
            if (play.pc.connectionState === 'connected') {
              return (
                <Dummy
                  key={key}
                  ref={(el) => (remoteDummyRef.current[key] = el)}
                  physics="character"
                  x={initX}
                  y={initY}
                  z={initZ}
                  width={15}
                  height={65}
                  scale={2}
                  roughnessFactor={0}
                  metalnessFactor={0.3}
                  animation={walking[key] ? 'walking' : 'idle'}
                  strideMove
                  intersectIds={[`cursor-${key}`]}
                  onIntersect={() => handleIntersect(key)}
                  // src={path('kazama.fbx')}
                  src={path(modules[_count])}
                  animations={{
                    idle: path('Idle.fbx'),
                    walking: path('Walking.fbx'),
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
                  <HTMLMesh
                    ref={(el) => (remoteNameRef.current[key] = el)}
                    y={42}
                    scale={0.6}
                  >
                    <p style={{ fontSize: '12px' }}>{play.name}</p>
                  </HTMLMesh>
                </Dummy>
              )
            } else {
              return <Cube key={play.id + 'dummy'} visible={false} />
            }
          })}
          {/* 其他玩家移动位置 */}
          {Object.keys(playes).map((key) => {
            const play = playes[key]
            const connected = play.pc.connectionState === 'connected'
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
        </World>
      )}
    </>
  )
}
