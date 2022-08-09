import { React, Component } from "react";
import Cardlist from "../component/Cardlist";
import Scroll from "../component/Scroll";
import SearchBox from "../component/SearchBox";
import ErrorBoundry from "../component/ErrorBundaries";

class App extends Component {
    constructor (){
        // 用this之前一定要用的
        super(); 
        // 用這個來描述我們的app
        this.state = {
            robots: [],
            searchfield: ''        
        }
    }

    componentDidMount () {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=>response.json())
        .then(users=>this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})
    }
    render () {
        const filterRobot = this.state.robots.filter(robot=>{
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0){
            return <h1>Loading</h1>
        }else {
        return(
                <div className="tc">
                    <h1 className="f1">robot friends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry> 
                          <Cardlist robots={filterRobot}/>
                        </ErrorBoundry>
                     </Scroll>
                </div>
            );
        }
    }
}

export default App;