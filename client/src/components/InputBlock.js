import ColorCheckbox from './ColorCheckbox';
import React from "react"

const colors = [
    "red",
    "pink",
    "purple",
    "blue",
    "grey",
    "yellow"
];

class InputBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            color: ''
        }
    }

    setColor = async (color) => {
        await this.setState({
            color: color
        })
        console.log(this.state.color);
    }

    addTodo = (e) => {
        e.preventDefault();
        this.props.onAddBtnClick({
            text: this.state.text,
            color: this.state.color
        });
        this.setState({
            text: '',
            color: colors[0]
        });
    }

    handleChange = async (e) => {
        await this.setState({
            text: e.target.value
        });
    }

    render() {
        return (
            <form action="/todos" method="POST" className="add-block" id="add-block">
                <input type="text" id="add-input" className="add-input" value={this.state.text} onChange={this.handleChange} placeholder="Add New Item" />
                <div className="colors">
                    <ColorCheckbox onColorClick={this.setColor} color={colors[0]} />
                    <ColorCheckbox onColorClick={this.setColor} color={colors[1]} />
                    <ColorCheckbox onColorClick={this.setColor} color={colors[2]} />
                    <ColorCheckbox onColorClick={this.setColor} color={colors[3]} />
                    <ColorCheckbox onColorClick={this.setColor} color={colors[4]} />
                    <ColorCheckbox onColorClick={this.setColor} color={colors[5]} />
                </div>
                <button onClick={this.addTodo} type="submit" className="add-btn" id="add-btn">Add</button>
            </form>
        );
    }
}

export default InputBlock;
