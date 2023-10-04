import { Space, Typography } from 'antd';
import { CountdownTimeDelta } from 'react-countdown';

export function TimerCountdown({ days, hours, minutes, seconds }: Partial<CountdownTimeDelta>) {
  return (
    <Space direction="horizontal" align="center" size="large">
      <div className="countdown-unit">
        <Typography>{days}</Typography>
        <Typography>Days</Typography>
      </div>

      <div className="countdown-unit">
        <Typography>{hours}</Typography>
        <Typography>Hours</Typography>
      </div>

      <div className="countdown-unit">
        <Typography>{minutes}</Typography>
        <Typography>Minutes</Typography>
      </div>

      <div className="countdown-unit">
        <Typography>{seconds}</Typography>
        <Typography>Seconds</Typography>
      </div>
    </Space>
  );
}
