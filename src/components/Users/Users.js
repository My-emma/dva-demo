import React from 'react';
import styles from './Users.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router'
import { PAGE_SIZE } from '../../constans/constans';
import { Table, Pagination, Popconfirm } from 'antd';

function Users({ dispatch, list: dataSource, total, page: current }) {
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
  }
  const columns = [{
    title: '姓名',
    dataIndex: 'username',
    key: 'name',
    render: text => <a href="">{text}</a>,
  }, {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  }, {
    title: 'Website',
    dataIndex: 'website',
    key: 'website',
  }, {
    title: 'Operation',
    key: 'operation',
    render: (text, { id }) => (
      <span className={styles.operation}>
        <a href="">Edit</a>
        <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, id)}>
          <a href="">Delete</a>
        </Popconfirm>
      </span>
    ),
  }];
  function setSize(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }))
  }
  return (
    <div className={styles.normal}>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.id}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        total={total}
        current={current}
        pageSize={PAGE_SIZE}
        onChange={setSize}
      />
    </div>
  );
}

function mapStatesToProps(state) {
  const { list, total, page } = state.users;
  return {
    list,
    total,
    page,
  };
}

export default connect(mapStatesToProps)(Users);
