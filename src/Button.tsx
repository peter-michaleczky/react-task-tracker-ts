import {MouseEventHandler} from "react";

interface Props {
    color?: string;
    text?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({color, text, onClick}: Props) => {
    return (
        <button
            style={{backgroundColor: color}}
            className='btn'
            onClick={onClick}
        >
            {text ?? 'Button'}
        </button>
    )
}

Button.defaultProps = {
    color: 'steelblue',
}

export default Button;