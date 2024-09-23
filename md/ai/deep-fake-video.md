---
{
  "title": "A solution for creating DeepFake videos",
  "draft": false,
  "created_at": "2024-09-22",
  "category": "AI",
  "tags": ["DeepFake"],
  "description": "This article introduces a solution for creating DeepFake videos, utilizing the ElevenLabs and video-retalk models."
}
---

The basic steps involve first using the [ElevenLabs](https://elevenlabs.io/) platform to deepfake the voice, then feeding the fake voice along with a talking head video into the [video-retalking](https://github.com/OpenTalker/video-retalking) model to generate the final DeepFake video.

## Step 1: Deep Fake audio

In this step, you need to have a recording of the person you want to DeepFake. Go to [ElevenLabs](https://elevenlabs.io/) and use its speech to speech service. It may take 10 to 20 dollars. Finally, you should have a deep fake audio. 

## Step 2: Audio-based Lip Synchronization

We are going to use  [video-retalking](https://github.com/OpenTalker/video-retalking) model. If you don't want to run the model on your local, you can use some cloud service like [video-retalking on Replicate](https://replicate.com/chenxwh/video-retalking). Input the fake voice together with a talking head video into the video-retalking model to produce the final DeepFake video.