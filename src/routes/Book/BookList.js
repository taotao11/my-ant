import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { List, 
  Col,
  Icon,
  Row,
  Menu,
  Avatar,
  Dropdown,
} from 'antd';
import { Link } from 'dva/router';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../List/BasicList.less';
const menu = (
  <Menu>
    <Menu.Item>
      <a>编辑</a>
    </Menu.Item>
    <Menu.Item>
      <a>删除</a>
    </Menu.Item>
  </Menu>
);
const MoreBtn = () => (
  <Dropdown overlay={menu}>
    <a>
      更多 <Icon type="down" />
    </a>
  </Dropdown>
);
const ListContent = ({ data: {auth, createTime, type, newWorks } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <Row>
        <Col span={12} push={12}>
          <span>作者</span>
          <p>{auth.substring(3)}</p>
        </Col>
        <Col span={12} pull={12}>
          <span>类型</span>
          <p>{type}</p>
        </Col>
      </Row>
    </div>
    <div className={styles.listContentItem}>
    <Row>
        <Col span={12} push={12}>
          <p>最新章节: &nbsp; {newWorks}</p>
        </Col>
        <Col span={12} pull={12}>
          <span>开始时间</span>
          <p>{moment(createTime).format('YYYY-MM-DD HH:mm')}</p>
        </Col>
      </Row>
    </div>
  </div>
);
// 链接dav 得到propos
// @connect(({ a  }) => ({
//   a,
// }))
// @Form.create() 
//  还可继承 extends PureComponent 性能优化 React.Component一般写法 

  class Book extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'book/queryBooks',
      payload: {
        param: {
          current: 1,
          size: 5
        }
      },
    });
  }
  pageOnchange = (page, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'book/queryBooks',
      payload: {
        param: {
          current: page ,
          size: pageSize
        }
      },
    });
  }
  onShowSizeChange = (current,size) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'book/queryBooks',
      payload: {
        param: {
          current: current ,
          size: size
        }
      },
    });
  }
  render() {
    const {records,current,total,size} = this.props.bookData;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.pageOnchange,
      onShowSizeChange:this.onShowSizeChange,
      current:current,
      pageSize: size,
      total: total,
    };
    return (
      <PageHeaderLayout>
        <List
              size="large"
              rowKey="id"
              // loading={loading}
              pagination={paginationProps}
              dataSource={records}
              renderItem={item => (
                <List.Item actions={[<Link to={{ pathname: `/book/section`, param: item }}>阅读</Link>, <MoreBtn />]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.imgUrl} shape="square" size="large" />}
                    title={<a href={item.readUrl}>{item.name}</a>}
                    description={item.content}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
      </PageHeaderLayout>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
      bookData: state.book.bookData,
  }
  // loading、data都是来自对应的reduce
}
export default connect(mapStateToProps)(Book)