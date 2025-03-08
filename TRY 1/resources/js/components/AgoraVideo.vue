<template>
    <div>
      <div id="video-container"></div>
      <button @click="toggleAudio">Toggle Audio</button>
      <button @click="toggleVideo">Toggle Video</button>
      <button @click="endCall">End Call</button>
    </div>
  </template>

  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import AgoraRTC from 'agora-rtc-sdk';

  const appId = 'YOUR_AGORA_APP_ID';  // Replace with your Agora App ID
  const channel = 'test';  // Channel name
  const uid = ref(null);  // The user ID (can be null)

  let client = null;
  let localAudioTrack = null;
  let localVideoTrack = null;

  const toggleAudio = () => {
    if (localAudioTrack) {
      if (localAudioTrack.isMuted) {
        localAudioTrack.setMuted(false);
      } else {
        localAudioTrack.setMuted(true);
      }
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      if (localVideoTrack.isMuted) {
        localVideoTrack.setMuted(false);
      } else {
        localVideoTrack.setMuted(true);
      }
    }
  };

  const endCall = () => {
    if (client) {
      client.leave().then(() => {
        console.log('Left the channel');
        localAudioTrack.stop();
        localVideoTrack.stop();
        localAudioTrack.close();
        localVideoTrack.close();
      });
    }
  };

  onMounted(() => {
    client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Join the channel
    client.join(appId, channel, null, (userId) => {
      uid.value = userId;
      console.log('Joined the channel: ', userId);

      // Create local tracks
      AgoraRTC.createMicrophoneAndCameraTracks().then(([audioTrack, videoTrack]) => {
        localAudioTrack = audioTrack;
        localVideoTrack = videoTrack;

        // Publish the tracks
        client.publish([localAudioTrack, localVideoTrack]);

        // Add video track to the container
        localVideoTrack.play('video-container');
      });
    });

    // Listen for remote users joining
    client.on('user-published', (user, mediaType) => {
      console.log('User published: ', user);
      client.subscribe(user, mediaType).then(() => {
        if (mediaType === 'video') {
          user.videoTrack.play('video-container');
        }
      });
    });

    // Listen for user leaving the channel
    client.on('user-unpublished', (user) => {
      console.log('User unpublished: ', user);
    });
  });

  onBeforeUnmount(() => {
    if (client) {
      client.leave();
    }
  });
  </script>
