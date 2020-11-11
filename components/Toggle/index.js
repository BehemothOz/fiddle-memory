export const Toggle = props => {
    const { onToggleClick } = props;

    return <button onClick={onToggleClick}>Switch</button>;
};
