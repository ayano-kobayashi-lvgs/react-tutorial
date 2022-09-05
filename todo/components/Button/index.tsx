import { FC, ReactNode, MouseEvent } from 'react';

type ButtonProps = {
    onClick: (e: MouseEvent) => void
    disabled?: boolean
    className: string
    children: ReactNode
}

export const Button: FC<ButtonProps> = ({
    onClick,
    disabled,
    className,
    children,
}) => <button onClick={(e: MouseEvent) => onClick && onClick(e)} className={className} disabled={disabled}>{children}</button>;
