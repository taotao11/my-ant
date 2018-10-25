import React, { PureComponent } from 'react';
import { Table, Input, Button, Spin, Popconfirm, Form, Modal } from 'antd';
import { connect } from 'dva';
import ModelFormComp from '../../utils/ModelFormComp';
const FormItem = Form.Item;
class jsoup extends React.Component {
    state = {
        jsoupSelVis: false,
        visible: false,
        parentId: null,
        jsoupVis: false,
        node: null,
    }
    constructor(props) {
        super(props);
        this.showCurRowMessage = this.showCurRowMessage.bind(this);
    }
    //  组件渲染之后调用，只调用一次
    componentDidMount() {
        this.jsoupInit();
    }
    //  组件初始化时不调用，组件接受新的props时调用。
    componentWillReceiveProps(nextProps){

        // 刷新
        if(nextProps.record){
            this.jsoupInit();
            this.cleanForm(nextProps.form);
            nextProps.dispatch({
                type: 'jsoup/record',
                payload:false,
            });
        }
       
    }
    // 
    jsoupInit = () =>{
        const { dispatch } = this.props;
        dispatch({
            type: 'jsoup/isSpin',
            payload:true,
        });
        dispatch({
            type: 'jsoup/jsoup',
            payload: {
                param: {}
            },
        });
    }
    //展示当前行信息
    showCurRowMessage(record) {
    }
    //添加
    addjsoup = (record) => {
        this.setState({
            visible: true,
            parentId: record.id,
        })
    }
    // 修改
    updateJsoup = (record) => {

    }
    // 删除
    deleteJsoup = (record) => {

    }
    // 关闭弹框
    hideModal = () => {
        this.setState({
            visible: false
        })
        this.cleanForm(this.props.form);
    }
    // 清空表单
    cleanForm = (form) =>{
        form.resetFields();
    }
    // 添加
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            const { dispatch } = this.props;
            dispatch({
                type: 'jsoup/addJsoup',
                payload: {
                    param: values
                },
            });
          }
        });
    }
    getJsoupCon = (record) => {
        console.log(record.jId)
        const { dispatch } = this.props;
        dispatch({
            type: 'jsoup/getJsoupCon',
            payload: {
                param: {id: record.jId}
            },
        });
        this.setState({
            jsoupSelVis: true,
        })
    }
    jsoupSelVisonCancel =() => {
        this.setState({
            jsoupSelVis: false,
        })
    }
    // 爬虫表单
    jsoupForm = (flag) => {
        const { getFieldDecorator } = this.props.form;
        
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="名称"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    label="抓取规则"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('cssQuery', {
                        rules: [{ required: true, message: 'Please input your cssQuery!' }],
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem
                    label="父id"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 12 }}
                >
                    {getFieldDecorator('parentId', {
                        rules: [{ required: true, message: 'Please input your parentId!' }],
                        initialValue: this.state.parentId,
                    })(
                        <Input disabled/>
                    )}
                </FormItem>
                
                <FormItem
                    wrapperCol={{ span: 12, offset: 5 }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </FormItem>
            </Form>
        )
    }

    // 爬虫内容 模块方法

    jsoupOnOk = (form) =>{
        form.validateFields((err, values) => {
            if (!err) {
              const { dispatch } = this.props;
              dispatch({
                  type: 'jsoup/addJsoupCon',
                  payload: {
                      param: values
                  },
              });
            }
          });
    }
    onCancel = (form) =>{
        this.setState({
            jsoupVis: false,
        })
        form.resetFields(form);
    }
    jsoupOSaveForm =(form) =>{
        console.log(form)
    }
    mFcomp = (record) =>{
        this.setState({
            jsoupVis: true,
            node: record.id,
        })
    }
    render() {
        let self = this;
        const jsoupColumns = [
            { title: 'id', dataIndex: 'id', key: 'id' },
            { title: '爬虫名称', dataIndex: 'name', key: 'name' },
            { title: '抓取规则', dataIndex: 'cssQuery', key: 'cssQuery' },
            { title: '父id', dataIndex: 'parentId', key: 'parentId' },
            {
                title: '操作', dataIndex: '', key: 'operation', render: function (text, record, index) {
                    return (
                        <span>
                            <Button type="primary" size="small" onClick={() => self.addjsoup(record)}>添加</Button>
                            {record.jId == null ? null :<Button type="primary" onClick = {() => self.getJsoupCon(record)} size="small">查看</Button>}
                            {
                                (record.children.length == 0 && record.jId == null) ? 
                                <Button type="primary" size="small" onClick={() =>self.mFcomp(record)}>小说</Button> : null
                            }
                            <Button type="primary" size="small">修改</Button>
                            <Button type="primary" size="small">删除</Button>
                        </span>
                    );
                }
            },
        ];
        const rowSelection = {
            onChange(selectedRowKeys, selectedRows) {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            onSelect(record, selected, selectedRows) {
                console.log(record, selected, selectedRows);
            },
            onSelectAll(selected, selectedRows, changeRows) {
                console.log(selected, selectedRows, changeRows);
            },
        
        };
        const columns = [
            {
                label: '爬虫id',
                name: 'node',
                message: '爬虫id不为空',
                disabled: true,
                rules: true,
                type: 'text',
            },
            {
                label: '书名',
                name: 'name',
                message: '书名不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '内容',
                name: 'content',
                message: '内容不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '阅读地址',
                name: 'readUrl',
                message: '阅读地址不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '图片地址',
                name: 'imgUrl',
                message: '图片地址不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '下载地址',
                name: 'dwUrl',
                message: '下载地址不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '作者',
                name: 'auth',
                message: '作者不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '状态',
                name: 'status',
                message: '状态不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '最新章节',
                name: 'newWorks',
                message: '最新章节不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '点击数',
                name: 'click',
                message: '点击不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
            {
                label: '类型',
                name: 'type',
                message: '类型不为空',
                disabled: false,
                rules: true,
                type: 'text',
            },
        ];
        const record = {
            node: this.state.node,
            name:"",
            content:"",
            readUrl:"",
            imgUrl:"",
            dwUrl:"",
            auth:"",
            status:"",
            newWorks:"",
            auth:"",
            click:"",
            type:"",
        }
        const isSpin = this.props.isSpin;
        return (
            <div>
                <Button type="primary" onClick={() => self.addjsoup({id: "0"})}>添加</Button>
                <Table columns={jsoupColumns}
                    // rowSelection={rowSelection}
                    dataSource={this.props.jsoups}
                    rowKey="id"
                    className="table"
                    loading={self.props.isSpin}
                />
                
                <Modal
                    title="添加网页爬取"
                    visible={this.state.visible}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                    <Spin tip="Loading..." spinning={isSpin}>
                        {this.jsoupForm()}
                    </Spin>
                </Modal>
                <ModelFormComp
                    title= '模态表单组件'
                    visible= { this.state.jsoupVis}
                    onOk= {this.jsoupOnOk}
                    onCancel={this.onCancel}
                    okText= '确定'
                    loading= {false}
                    columns= { columns }
                    saveForm= {this.jsoupOSaveForm}
                    record = { record }
                />
                <ModelFormComp
                    title= '爬虫内容查看'
                    visible= { this.state.jsoupSelVis}
                    onOk= {this.jsoupSelVisonCancel}
                    onCancel={this.jsoupSelVisonCancel}
                    okText= '确定'
                    loading= {false}
                    columns= { columns }
                    saveForm= {this.jsoupOSaveForm}
                    record = { this.props.jsoupCon }
                />
            </div>
        );

    }
}
function mapStateToProps(state, ownProps) {
    const jsoup = state.jsoup;
    return {
        jsoups: jsoup.jsoup,
        isSpin: jsoup.isSpin,
        record: jsoup.record,
        jsoupCon: jsoup.jsoupCon,
    }
    // loading、data都是来自对应的reduce
}
export default connect(mapStateToProps)(Form.create()(jsoup));
