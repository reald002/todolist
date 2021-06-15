import React from 'react';

class ColorCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    onColorClick = () => {
        this.props.onColorClick(this.props.color);
    }

    render() {
        return (
            <>
                <label onClick={this.onColorClick} style={{ backgroundColor: this.props.color }} className="color-label">
                    <input type="radio" className="color-radio" name="color-radio" />
                </label>
            </>
        );
    }
}

export default ColorCheckbox;
