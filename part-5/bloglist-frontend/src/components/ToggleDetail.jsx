import { useState } from 'react'

const ToggleDetail = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : 'inline' }
    const showWhenVisible = { display: visible ? 'inline' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    return (
        <>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.showLabel}</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.hideLabel}</button>
                {props.children}
            </div>
        </>
    )
}

export default ToggleDetail