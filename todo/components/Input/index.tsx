import { FC, ReactNode, MouseEvent } from 'react';

type InputProps = {
    className: string
    type: string
    required?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string
}

export const Input: FC<InputProps> = ({
    className,
    type,
    required,
    onChange,
    value,
}) => <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(e)} className={className} required={required} type={type} value={value} />;
