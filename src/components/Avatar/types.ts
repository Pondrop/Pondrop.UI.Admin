export type IAvatarProps = {
    avatars?: string[];
    width?: string;
    height?: string;
    initials?: string;
    name?: string;
    icon?: React.ReactNode;
    variant?: "square" | "roundedCorners";
    bgColor?: string;
    fontSize?: string;
    fontColor?: string;
};

export type IAvatarContainerProps = Omit<IAvatarProps, 'avatars' | 'initials' | 'name' | 'icon'>;
export type IAvatarImageProps = Pick<IAvatarProps, 'width' | 'height' | 'variant'>;