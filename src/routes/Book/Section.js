import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
    Table, List,
    Col,
    Icon,
    Row,
    Menu,
    Avatar,
    Dropdown,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../List/BasicList.less';
class Book extends PureComponent {
    state = {
        text: {}
    }
    componentDidMount() {
        console.log(this.props.location.param);
        this.setState({
            text: this.props.location.param
        });
        const { dispatch } = this.props;
        const params = {
            url: this.props.location.param.readUrl
        };
        dispatch({
            type: 'book/section',
            payload: {
                param: params.url,
            },
        });
    }
    render() {
        const {sections, urls} = this.props.section;
        return (
            <PageHeaderLayout>
                <List
                    pagination={{
                        pageSize: 20,
                      }}
                    header={<div>
                        <span style={{marginLeft: 20}}>{this.state.text.name}</span>
                        <span style={{marginLeft: 40}}>{this.state.text.auth}</span>
                        <span style={{marginLeft: 40}}>类型: &nbsp;{this.state.text.type}</span>
                    </div>}
                    bordered
                    dataSource={sections}
                    renderItem={(item,index) => (<List.Item>
                        <Link to={{ 
                            pathname: `/book/text`, 
                            param: {
                                url: urls[index],
                                title: item,
                                obj: this.state.text,
                            } 
                        }}>
                            {item}
                        </Link>
                    </List.Item>)}
                />
            </PageHeaderLayout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        section: state.book.section,
    }
    // loading、data都是来自对应的reduce
}
export default connect(mapStateToProps)(Book)