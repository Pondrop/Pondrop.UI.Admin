import { AvatarContainer, AvatarGroupContainer, AvatarImage } from './styles';
import { IAvatarProps } from './types';

const Avatar = ({
  avatars,
  width,
  height,
  initials,
  name,
  icon,
  variant,
  bgColor,
  fontSize,
  fontColor,
}: IAvatarProps) => {
  return (
    <>
      {avatars ? (
        <AvatarGroupContainer>
          {avatars.map((item, index) => (
            <AvatarImage key={index} src={item} width={width} height={height} variant={variant} />
          ))}
        </AvatarGroupContainer>
      ) : (
        <AvatarContainer
          width={width}
          height={height}
          variant={variant}
          bgColor={bgColor}
          fontSize={fontSize}
          fontColor={fontColor}
        >
          {initials && <span>{initials}</span>}
          {name && name.split(' ')[0][0] + name.split(' ')[1][0]}
          {icon && icon}
        </AvatarContainer>
      )}
    </>
  );
};

export default Avatar;
