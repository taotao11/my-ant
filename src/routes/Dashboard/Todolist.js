import React from 'react';
import { connect } from 'dva';

class Todolist extends React.Component{
    componentDidMount() {
        this.props.dispatch({type:'todolist/getData',payload:{flag:'1'}})
    }
    render() {
        return (
            <div>
                <div>
                    <input value={this.props.list} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    console.log(state.todolist.list)
    return {
        list: state.todolist.list
    }
}
export default connect(mapStateToProps)(Todolist);