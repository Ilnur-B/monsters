import "./App.css";
import React, {Component} from "react";

import CardList from './component/card-list/card-list.component';
import SearchBox from './component/serch-box/search-box.component';
import Clock from "./component/clock/clock.component";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monsters: [],
            searchField: '',
            date: new Date()
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({monsters:users}));
        this.timerId = setInterval(() => this.tick(), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    tick() {
    this.setState({
        date: new Date()
    })
}



    render() {
        const { monsters , searchField } = this.state
        const filteredMonsters = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchField.toLowerCase())
        )
        return (

            <div className="App">
                <h1>Monsters catalog</h1>
                <Clock
                    date={this.state.date.toLocaleTimeString()}
                />
                <SearchBox
                    placeholder='search monster'
                    handler={e => this.setState({searchField: e.target.value})}
                />
                <CardList monsters={filteredMonsters}>
                </CardList>
            </div>


        );
    }
}
