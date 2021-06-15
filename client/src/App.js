import InputBlock from './components/InputBlock';
import Todo from './components/Todo';
import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    };

    handleRemoveBtnClick = async (id) => {
        await this.setState({
            data: this.state.data.filter(e => e._id !== id)
        });
    }

    handleAddBtnClick = async (todo) => {
        const newItem = await fetch('http://localhost:3001/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                text: todo.text,
                color: todo.color
            }),
        });
        const newItemJson = await newItem.json();
        this.setState({
            data: [...this.state.data, newItemJson]
        });
    };

    componentDidMount = async () => {
        try {
            const data = await fetch('http://localhost:3001/todos');
            const dataJson = await data.json();
            this.setState({
                data: dataJson
            });
        } catch (e) {
            console.log(e.reason);
        }
    };

    render() {
        return (
            <div className="App">
                <div className="container">
                    <ul className="todo" id="todo">
                        {this.state.data.map( el => (
                            <Todo onRemoveBtnClick={this.handleRemoveBtnClick} text={el.text} color={el.color} id={el._id} checked={el.checked}/>
                        ))}
                    </ul>
                    <InputBlock onAddBtnClick={this.handleAddBtnClick} />
                </div>
            </div>
        );
    }
}

export default App;
