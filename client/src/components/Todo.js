import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked
        };
    }

    deleteTodo = async () => {
        const id = this.props.id
        await fetch(`http://localhost:3001/todos/${id}`, {
            method: 'DELETE'
        });
        this.props.onRemoveBtnClick(this.props.id);
    }

    todoClick = async () => {
        const id = this.props.id
        try {
            await fetch(`http://localhost:3001/todos/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({
                    checked: !this.state.checked
                })
            });
            this.setState({
                checked: !this.state.checked
            })
        } catch (e) {
            console.log(e.reason);
        }
    }

    render() {
        return (
            <li className={`todo__item ${this.state.checked ? 'checked' : ''}`}>
                <p onClick={ this.todoClick } className="todo__item-inner">
                    <span style={{ backgroundColor: this.props.color }} className="todo__item-checkbox">
                        <input id={ this.props.id } className="checkbox" type="checkbox" />
                    </span>
                    <span style={{ backgroundColor: this.props.color }} className="todo__item-text">{this.props.text}</span>
                </p>
                <button onClick={this.deleteTodo} id={ `remove-${this.props.id}` } name="removeTodo" className="todo__item-remove">Удалить</button>
            </li>
        );
    }
}

export default Todo;
