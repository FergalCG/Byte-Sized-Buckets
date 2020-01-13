import React, { Component } from 'react'
import AllTodos from './AllTodos'
import TodoForm from './TodoForm'
import BucketList from './BucketList'

export let chooseView = function(bool) {
    if(this.state.allTodos !== bool) {
        this.setState({allTodos: bool})
    }
}

export default class Main extends Component {
    constructor() {
        super()
        this.state = {
            allTodos: true,
            formVisible: false
        }
        chooseView = chooseView.bind(this)
    }

    

    render() {
        return (
            <div id="next">
                {
                    this.state.allTodos ?
                    <div id='all-todos'>
                        <AllTodos />
                        {
                            this.state.formVisible ?
                            <TodoForm />
                            :
                            null
                        }
                    </div>
                    :
                    <div id='bucket'>
                        <BucketList />
                    </div>
                }
            </div>
        )
    }
}