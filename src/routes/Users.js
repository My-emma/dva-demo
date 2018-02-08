import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UserList from '../components/Users/Users';
import { Button, Modal, Input } from 'antd';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      creatVal: {
        name: '',
        email: '',
        website: '',
      },
    };
    this.hideModel = this.hideModel.bind(this);
    this.showModel = this.showModel.bind(this);
    this.creatModel = this.creatModel.bind(this);
  }
  hideModel() {
    this.setState({
      visible: false,
    });
  }
  showModel() {
    this.setState({
      visible: true,
    });
  }
  changeModel(e) {
    const { name, value } = e.target;
    this.setState({
      creatVal: { ...this.state.creatVal, [name]: value },
    });
  }
  creatModel() {
    this.props.dispatch({
      type: 'users/create',
      payload: {
        values: { ...this.state.creatVal },
      },
    });
    this.setState({
      visible: false,
    });
  }
  render() {
    const { list } = this.props;
    const { name, email, website } = this.state.creatVal;
    return (
      <div className={styles.normal}>
        <Button type="primary" onClick={this.showModel}>添加数据</Button>
        <UserList list={list} />
        <Modal
          title="添加数据"
          visible={this.state.visible}
          onOk={this.creatModel}
          onCancel={this.hideModel}
          okText="确定"
          cancelText="取消"
        >
          <Input placeholder="请输入用户名" name="name" value={name} onChange={e => this.changeModel(e)} />
          <Input placeholder="邮箱" name="email" value={email} onChange={e => this.changeModel(e)} />
          <Input placeholder="websit" name="website" value={website} onChange={e => this.changeModel(e)} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.users.list,
  };
}

export default connect(mapStateToProps)(Users);
