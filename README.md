# peer

const DEFAULT_PEER_CONNECTION_CONFIG = {
  iceServers: [
    {
      urls: [
        'stun:54.250.193.38:3478',
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun3.l.google.com:19302',
        'stun:54.250.193.38:3478',
      ]
    },
    {
      urls: ['turn:54.250.193.38:3478'],
      username: 'firefly',
      credential: 'firefly12345'
    }
  ]
};


# receiver
 this.peerConnection.addEventListener('icecandidate', (event) => {
      if (event.candidate == null) {
        return;
      }
      this.dispatchEvent(new CustomEvent('ice-candidate'));
    });

     await pEvent(this, 'ice-candidate');
    await delay(ICECOMPLETE_TIMEOUT);