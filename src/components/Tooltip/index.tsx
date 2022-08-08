import { useState } from 'react';

import { TooltipBox, TooltipContainer, TooltipMessage, TooltipTarget } from './styles';
import { ITooltipProps } from './types';

const Tooltip = ({ position, label, children, background, width, fontSize, fontColor, arrow }: ITooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <TooltipContainer onMouseLeave={() => setIsHovered(false)}>
      {isHovered && (
        <TooltipBox position={position} background={background} width={width} arrow={arrow}>
          <TooltipMessage fontColor={fontColor} fontSize={fontSize}>
            {label}
          </TooltipMessage>
        </TooltipBox>
      )}
      <TooltipTarget onMouseEnter={() => setIsHovered(true)}>{children}</TooltipTarget>
    </TooltipContainer>
  );
};

export default Tooltip;
