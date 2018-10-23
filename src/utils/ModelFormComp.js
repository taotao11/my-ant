import React from 'react';
import { Form, Modal, Select, Spin, Input, InputNumber } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class ModelFormComp extends React.Component{
    constructor(props) {
        super(props);
    }
    getInput() {
        if(column.type === 'text'){
            return(<Input disabled = {column.disabled} />);
        }
        if(column.type === 'select'){

        }
        if(column.type === 'number'){
            return(<InputNumber disabled = {column.disabled} />);
        }
    }
    render() {
        const { form, title, visible, onOk, onCancel, okText, loading, columns, saveForm, record } = this.props;
        const { getFieldDecorator } = form;
        // saveForm(form);
        return (
            <Modal
                width='30%'
                title = {title}
                visible = {visible}
                onOk = {() =>onOk(form)}
                onCancel = {() =>onCancel(form)}
                okText = {okText}
            >
                <Spin spinning={loading}>
                    <Form>
                        {
                            columns.map( (item,key) =>{
                                return(
                                    <FormItem label={item.label} key={key} labelCol={{ span: 5 }}
                                    wrapperCol={{ span: 12 }}>
                                        {getFieldDecorator(item.name,{
                                            rules: [{ required: item.rules, message: item.message }],
                                            initialValue: record ? record[item.name] : null ,
                                        })(
                                            item.type === 'text' ? <Input idth='80%' disabled = {item.disabled} /> :
                                            item.type === 'number' ? <InputNumber width='80%' disabled = {item.disabled} /> :
                                            <Select idth='80%' disabled = {item.disabled} >
                                               { item.option.map((item,key) =>{
                                                    return (<Option key={item.key}>{item.value}</Option>)
                                                })
                                                }   
                                            </Select>
                                        )}
                                    </FormItem>
                                )
                            })
                        }
                    </Form>
                </Spin>
            </Modal>
        )
    }
}

export default Form.create()(ModelFormComp);