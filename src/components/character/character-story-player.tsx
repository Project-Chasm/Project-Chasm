'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface CharacterStory {
  id: string;
  characterId: string;
  title: string;
  summary: string;
  audioUrl?: string;
}

interface CharacterStoryPlayerProps {
  story: CharacterStory;
}

export function CharacterStoryPlayer({ story }: CharacterStoryPlayerProps) {
  console.log(story);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');

  // Format time in mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Simulate audio playback for demo purposes
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const newProgress = prev + 0.5;
          setCurrentTime(formatTime((newProgress / 100) * 300)); // Assuming 5 min (300 sec) duration
          return newProgress;
        });
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Set initial duration
  useEffect(() => {
    setDuration(formatTime(300)); // 5 minutes
  }, []);

  return (
    <div className='space-y-4 bg-card/50 p-4 border rounded-lg'>
      <div className='space-y-2'>
        <div className='flex justify-between items-center'>
          <span className='text-muted-foreground text-sm'>{currentTime}</span>
          <span className='text-muted-foreground text-sm'>{duration}</span>
        </div>
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={(value) => {
            setProgress(value[0]);
            setCurrentTime(formatTime((value[0] / 100) * 300));
          }}
        />
      </div>

      <div className='flex justify-center items-center gap-4'>
        <Button variant='ghost' size='icon' className='w-8 h-8'>
          <SkipBack className='w-4 h-4' />
          <span className='sr-only'>Skip back</span>
        </Button>
        <Button
          variant='outline'
          size='icon'
          className='rounded-full w-12 h-12'
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ?
            <Pause className='w-6 h-6' />
          : <Play className='pl-1 w-6 h-6' />}
          <span className='sr-only'>{isPlaying ? 'Pause' : 'Play'}</span>
        </Button>
        <Button variant='ghost' size='icon' className='w-8 h-8'>
          <SkipForward className='w-4 h-4' />
          <span className='sr-only'>Skip forward</span>
        </Button>
      </div>

      <div className='flex items-center gap-2'>
        <Volume2 className='w-4 h-4 text-muted-foreground' />
        <Slider
          value={[volume]}
          max={100}
          step={1}
          className='flex-1'
          onValueChange={(value) => setVolume(value[0])}
        />
      </div>
    </div>
  );
}
