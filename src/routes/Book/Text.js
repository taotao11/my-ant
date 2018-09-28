import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
    Card,
    Row,
    Col,
    Button,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../List/BasicList.less';
class Book extends PureComponent {
    state = {
        url: '',
        title: '',
        obj: {},
    }
    componentDidMount() {
        console.log(this.props.location.param);
        this.setState({
            url: this.props.location.param.url,
            title: this.props.location.param.title,
            obj: this.props.location.param.obj,
        });
        const { dispatch } = this.props;
        dispatch({
            type: 'book/text',
            payload: {
                param: this.props.location.param.url,
            },
        });
    }
    /**
     * 改变章节
     */
    changNext = () =>{
        let url = this.state.url;
        url = url.substring(0,url.lastIndexOf("/")+1) + this.props.text.next;
        this.setState({
            url
        })
        const { dispatch } = this.props;
        dispatch({
            type: 'book/text',
            payload: {
                param: url,
            },
        });
    }
    changPre = () =>{
        let url = this.state.url;
        url = url.substring(0,url.lastIndexOf("/")+1) + this.props.text.pre;
        this.setState({
            url
        })
        const { dispatch } = this.props;
        dispatch({
            type: 'book/text',
            payload: {
                param: url,
            },
        });
    }
    render() {
        return (
            <PageHeaderLayout>
                <Card
                    hoverable
                    title={this.state.obj.name}
                >
                   <Card.Meta
                        title={this.props.text.section}
                        description={'  '+ this.props.text.content}
                    >
                    </Card.Meta>
                    <Row style={{marginTop: 40}}>
                        <Col offset={2} lg={8}>
                            <Button onClick={this.changPre} type="primary">上一章</Button>
                        </Col>
                        <Col offset={6} lg={8}>
                        <Button onClick={this.changNext} type="primary">下一章</Button>
                        </Col>
                    </Row>
                     
                </Card>
            </PageHeaderLayout>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        text: state.book.text,
    }
    // loading、data都是来自对应的reduce
}
export default connect(mapStateToProps)(Book)