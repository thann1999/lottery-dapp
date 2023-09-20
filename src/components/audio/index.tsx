import { useEffect, useRef } from 'react';

import { useTranslation } from 'react-i18next';

import { AudioProps } from '@interfaces';
import './audio.scss';

export default function Audio({ src, type = 'audio/wav' }: AudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Reload audio source when upload new file
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
    }
  }, [src]);

  return (
    <div className="custom-audio">
      <audio controls style={{ width: '100%', height: 45, marginTop: 6 }} ref={audioRef}>
        <track kind="captions" />
        <source src={src || ''} type={type} />
        {t('table.browserNotSupport', 'Browser not support')}
      </audio>
    </div>
  );
}
