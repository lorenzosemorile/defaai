import {forwardRef} from "react";

/*
  Player Component with forwardedRef
 */
export const Player = forwardRef((props, ref) => {
  const {data, getProgress} = props;

  /*
    Calculate vision progress and lifting up using callback
   */
  const onTimeUpdateHandle = () => {
    const player = ref.current;
    const duration = player.duration;
    const currentTime = player.currentTime;
    const watchPoint = Math.floor((currentTime/duration) * 100);
    getProgress(watchPoint);
  }

  return (
    <video
      ref={ref}
      onTimeUpdate={onTimeUpdateHandle}
      preload="preload"
      style={{ display: 'none'}}
      playsInline
    >
      <source
        type={data.type}
        src={data.src} />
    </video>
  )
});

