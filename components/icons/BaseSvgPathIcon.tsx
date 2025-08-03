import { useMemo } from 'react';
import { Path, PathProps, Svg, SvgProps } from 'react-native-svg';

export interface BaseSvgPathIconProps extends SvgProps, PathProps {
  data: string;
}

const DEFAULT_ICON_SIZE = 16;

/**
 * The base SVG path icon component that is used to create icons from SVG path data.
 * @returns A React component that renders an SVG icon.
 */
export function BaseSvgPathIcon({
  data,
  width = DEFAULT_ICON_SIZE,
  height = DEFAULT_ICON_SIZE,
  ...props
}: BaseSvgPathIconProps) {
  const viewBox = useMemo(() => {
    return `0 0 ${width} ${height}`;
  }, [width, height]);

  return (
    <Svg
      width={width}
      height={height}
      viewBox={props.viewBox ?? viewBox}
      {...props}
    >
      <Path d={props.d ?? data} {...props} />
    </Svg>
  );
}
