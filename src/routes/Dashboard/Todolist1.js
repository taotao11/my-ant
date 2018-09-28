import React from 'react';
import todolist from  './Todolist1.less';
import { connect } from 'dva';


class Todolist1 extends React.Component{
    render(){
        return (
            <div className={todolist.box}>hello world</div>
        )
    }
}
function mapStateToProps(state){
    console.log(state)
    // return{
        
    // }
}
export default connect(mapStateToProps)(Todolist1);