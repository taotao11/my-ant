import React from 'react';
import { connect } from 'dva';
import {Button, message} from 'antd'
import ModelFormComp from './components/ModelFormComp'
// import { Button } from 'antd/lib/radio';

class Test extends React.Component{
    constructor(){
        super()
        this.state = {
            list : '1,2,3,4',
            visible: false,
        }
    }
    clickhandle=()=>{
        this.setState({
            visible: true,
        });
    }

    onCancel =() =>{
        this.setState({
            visible: false,
        });
        this.form.resetFields();
    }
    onOk =() =>{
        this.form.validateFields((err,values) => {
            console.log(values);
            if(err){
                message.info('请填写完整!')
            }
        });
    }
    saveForm = (form) =>{
        this.form = form;
    }
    //渲染
    render() {
        const columns = [
            {
                label: '姓名',
                name: 'name',
                message: '姓名不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '年龄',
                name: 'age',
                message: '年龄不为空',
                disabled: false,
                rules: true,
                type: 'number',
            },
            {
                label: '描述',
                name: 'title',
                message: '描述不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '说明',
                name: 'sm',
                message: '描述不为空',
                disabled: false,
                rules: true,
                type: 'select',
                option: [
                    {key: '01', value: '好看1'},
                    {key: '02', value: '好看2'},
                    {key: '03', value: '好看3'},
                    {key: '04', value: '好看4'},
                ],
            }
        ];
        const record = {
            name: '账上明珠',
            title: '形容很值钱',
            sm: '很值钱',
            age: 18
        }
        return (
            <div >
                <Button type='primary' onClick={(e)=>this.clickhandle(e)} >弹框</Button>
                <div>
                    <input defaultValue= {this.state.list} />
                </div>
                <ModelFormComp
                    title= '模态表单组件'
                    visible= { this.state.visible }
                    onOk= {this.onOk}
                    onCancel={this.onCancel}
                    okText= '确定'
                    loading= {false}
                    columns= { columns }
                    saveForm= {this.saveForm}
                    record = { record }
                />
            </div>
            
        )
    }
}
export default connect()(Test);