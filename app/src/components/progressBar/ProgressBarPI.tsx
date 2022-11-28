type Props = {
  size?: number | undefined;
  progress?: number | undefined;
  trackWidth?: number | undefined;
  trackColor?: string | undefined;
  indicatorWidth?: number | undefined;
  indicatorColor?: string | undefined;
  indicatorCap?: 'round' | 'inherit' | 'butt' | 'square' | undefined;
  label?: string | number | undefined;
  labelColor?: string | undefined;
  spinnerMode?: false | undefined;
  spinnerSpeed?: number | undefined;
  className?: string | undefined;
};

const ProgressBarPI = ({
  size = 150,
  progress = 0,
  trackWidth = 10,
  trackColor = `#ddd`,
  indicatorWidth = 10,
  indicatorColor = `#07c`,
  indicatorCap = `round`,
  label = `Loading...`,
  labelColor = `text-selectedFont`,
  spinnerMode = false,
  spinnerSpeed = 1,
  className,
}: Props) => {
  const center = size / 2;
  const radius =
    center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray * ((100 - progress) / 100);

  // const hideLabel = !!(size < 100 || !label.length || spinnerMode);

  return (
    <>
      <div
        className={`relative ${className}`}
        style={{ width: size, height: size }}
      >
        <svg className="-rotate-90" style={{ width: size, height: size }}>
          <circle
            className="svg-pi-track"
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={trackColor}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator ${
              spinnerMode
                ? 'origin-center animate-[spinner_.75s_linear_infinite]'
                : ''
            }`}
            style={{ animationDuration: `${spinnerSpeed * 1000}` }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            stroke={indicatorColor}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>
        {label !== undefined && (
          <div className="absolute text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <p className={`text-base font-DoHyeon ${labelColor}`}>{label}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ProgressBarPI;
