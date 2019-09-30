import React from 'react'

const Todo = props => {
    const {content} = props.todo
    return (
            <div>
                {content}
            </div>
    )
}


export default Todo