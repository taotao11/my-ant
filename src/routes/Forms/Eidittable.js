import React, { PureComponent } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { connect } from 'dva';
class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.showCurRowMessage = this.showCurRowMessage.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
          type: 'book/jsoup',
          payload: {
            param: {}
          },
        });
    }

    //展示当前行信息
    showCurRowMessage(record) {
    }

    render() {
        let self = this;
        const jsoupColumns = [
            { title: 'id', dataIndex: 'id', key: 'id' },
            { title: '爬虫名称', dataIndex: 'name', key: 'name'},
            { title: '抓取规则', dataIndex: 'cssQuery', key: 'cssQuery' },
            { title: '父id', dataIndex: 'parentId', key: 'parentId' },
            {
                title: '操作', dataIndex: '', key: 'operation', render: function (text, record, index) {
                    return <a href="#" name="delete" onClick={function () { self.showCurRowMessage(record) }} >信息</a>;
                }
            },
            //精简写法
            //{ title: '操作', dataIndex: '', key: 'operation', render: (text, record, index) => <a href="#" name="delete" onClick={() => self.showCurRowMessage(record)}>信息</a> },
        ];
        const columns = [
            { title: '姓名', dataIndex: 'name', key: 'name' },
            { title: '年龄', dataIndex: 'age', key: 'age', render: (text, record, index) => (Math.floor(record.age / 10)) * 10 + "多岁" },
            { title: '住址', dataIndex: 'address', key: 'address' },
            { title: '描述', dataIndex: 'description', key: 'description' },
            {
                title: '操作', dataIndex: '', key: 'operation', render: function (text, record, index) {
                    return <a href="#" name="delete" onClick={function () { self.showCurRowMessage(record) }} >信息</a>;
                }
            },
            //精简写法
            //{ title: '操作', dataIndex: '', key: 'operation', render: (text, record, index) => <a href="#" name="delete" onClick={() => self.showCurRowMessage(record)}>信息</a> },
        ];

        const data = [
            {
                key: 1, name: 'hyw', age: 32, address: '西湖区湖底公园1号', description: '我是hyw，今年32岁，住在西湖区湖底公园1号。', children: [
                    { key: 1.1, name: 'fas', age: 32, address: '西湖区湖底公园1号', description: '我是fas，今年32岁，住在西湖区湖底公园1号。' },
                    { key: 1.2, name: 'wyz', age: 42, address: '西湖区湖底公园2号', description: '我是wyz，今年42岁，住在西湖区湖底公园2号。' },
                    { key: 1.3, name: 'ldz', age: 32, address: '西湖区湖底公园3号', description: '我是ldz，今年32岁，住在西湖区湖底公园3号。' },
                ]
            },
            {
                key: 2, name: 'lkx', age: 32, address: '西湖区湖底公园1号', description: '我是lkx，今年32岁，住在西湖区湖底公园1号。', children: [
                    { key: 1.1, name: 'fas', age: 32, address: '西湖区湖底公园1号', description: '我是fas，今年32岁，住在西湖区湖底公园1号。' },
                    { key: 1.2, name: 'wyz', age: 42, address: '西湖区湖底公园2号', description: '我是wyz，今年42岁，住在西湖区湖底公园2号。' },
                    { key: 1.3, name: 'ldz', age: 32, address: '西湖区湖底公园3号', description: '我是ldz，今年32岁，住在西湖区湖底公园3号。' },
                ]
            },
            { key: 3, name: 'mnk', age: 42, address: '西湖区湖底公园2号', description: '我是mnk，今年42岁，住在西湖区湖底公园2号。' },
            { key: 4, name: 'xyt', age: 32, address: '西湖区湖底公园3号', description: '我是xyt，今年32岁，住在西湖区湖底公园3号。' },
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

        return (
            <div>
                <Table columns={jsoupColumns}
                    // rowSelection={rowSelection}
                    dataSource={this.props.jsoups}
                    rowKey="id"
                    className="table"
                />
            </div>
        );

    }
}
function mapStateToProps(state, ownProps) {
    return {
        jsoups: state.book.jsoup,
    }
    // loading、data都是来自对应的reduce
  }
export default connect(mapStateToProps)(Form.create()(EditableTable));
