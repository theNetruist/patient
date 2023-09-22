import React, { Children, FC } from 'react';

interface Props {
    children: any;
    readerAccessible?: boolean;
    hidden?: boolean;
}

const ScreenReaderConditional: FC<Props> = (props: Props) => {
    const component = Children.map(props.children, (child) => {
        return child;
    });

    return (
        <div aria-hidden={!(props.readerAccessible ?? true)} style={props.hidden ? { textIndent: '-5000px' } : {}}>
            <>{component}</>
        </div>
    );
};

export default ScreenReaderConditional;
