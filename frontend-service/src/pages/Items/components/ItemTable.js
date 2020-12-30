import React from 'react';
import { connect } from 'dva';
import { Table, Input, notification, Menu, Checkbox, Form, Row, Col } from 'antd';
import { query, destroy, update, create } from '../../../services/feeds';
import AddItemForm from './AddItemForm';
import style from './style.scss';

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    return <Input/>;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  componentDidMount() {
    query().then(e => {
      console.log(e);
      this.setState({
        item: e.data,
        // Checked: e.data
      });
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      data,
      item: [],
      editingKey: '',
      // Checked: []
    };
    this.columns = [
      {
        title: 'title',
        dataIndex: 'title',
        width: '10%',
        editable: true,
        key: 'title'
      },
      {
        title: 'description',
        dataIndex: 'description',
        width: '30%',
        editable: true,
        key: 'description'
      },
      {
        title: 'link',
        dataIndex: 'link',
        width: '10%',
        editable: true,
        key: 'link'
      },
      {
        title: 'comments',
        dataIndex: 'comments',
        width: '15%',
        editable: true,
        key: 'comments'
      },
      {
        title: 'pubdate',
        dataIndex: 'pubdate',
        width: '15%',
        editable: true,
        key: 'pubdate'
      },
      {
        title: 'category',
        dataIndex: 'category',
        width: '15%',
        editable: true,
        key: 'category'
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '5%',
        fixed: 'right',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          // console.log(record);
          // console.log(editable)
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.delete(form, record.id)}
                    style={{ marginRight: 8 }}
                  >
                    delete
                  </a>
                )}
              </EditableContext.Consumer>
              {/* <Popconfirm title="Sure to cancel?" onConfirm={}> */}
                <a onClick={() => this.cancel(record.id)}>Cancel</a>
              {/* </Popconfirm> */}
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.id)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  isEditing = record => record.id === this.state.editingKey;

  cancel = (key) => {
    if(!this.handleRefesh(key)) return;
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      if(key === 'true'){
        create({
          ...row,
      }).then(e => {
        this.handleError(e);
      });
      return;
      }
      update({
          ...row,
          id: key
      }).then(e => {
        this.handleError(e);
      })
    });
  }

  delete(form, key){
    if(!this.handleRefesh(key)) return;
    destroy({ id: key }).then(e => {
      this.handleError(e);
    });
  }

  handleRefesh = (key) => {
    if(key === 'true'){
      query().then(e => {
        console.log(e);
        this.setState({
          item: e.data,
          editingKey: '',
          // Checked: e.data
        });
      });
      return false;
    }
    return true;
  }

  handleError = (e) => {
    if(e?.err?.response?.status) {
      console.log(e.err);
      this.openNotification('topLeft', {
        message: e.err.response.statusText,
        status: e.err.response.status
      });
      console.log(e);
    } else {
      this.openNotification('topLeft', {
        status: 200
      });
    }
    query().then(e => {
      console.log(e);
      this.setState({
        item: e.data,
        editingKey: '',
        // Checked: e.data
      });
    });
  }

  handleAdd = (e) => {
    const { item } = this.state;
    this.setState({
      item: [{
        id: 'true',
        category: '',
        comments: '',
        description: '',
        hashtable: '',
        link: '',
        pubdate: '',
        title: ''
      }, ...item],
      editingKey: 'true'
    })
  }

  openNotification = (placement, payload) => {
    notification.info({
      message: payload.status === 200 ? `SUCCESSFUL` : `ERROR ${payload.status}`,
      description:
        payload.message,
      placement,
    });
  };

  edit(key) {
    this.setState({ editingKey: key });
  }

  filterHandle = (e) => {
    const code = e.target.value;
    const { Checked } = this.state;
    const listCheckBox = [...Checked];
    const positionCode = listCheckBox.indexOf(code);
    if (positionCode === -1) {
      listCheckBox.push(code);
    } else {
      listCheckBox.splice(positionCode, 1);
    }
    this.setState({
      Checked: listCheckBox,
    });
  }

  editCheckboxGroup = () => {
    return (
      <Menu>
         {
            [{
              code: 1,
              name: 'minhpro'
            }].map(company => (
              <Menu.Item key={company.code}>
                 <Checkbox onChange={this.filterHandle} defaultChecked value={company.code}>
                  {` ${company.name}`}
                 </Checkbox>
              </Menu.Item>
            ))
          }
      </Menu>
    );
  }

  render() {
    // console.log(this.state.item);
    // const checkboxGroup = (<this.editCheckboxGroup/>);
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <Row type="flex" justify="center" style={{ marginTop: '10px' }} className={style.wrapper}>
        <Col span={24}>
          {/* <Dropdown overlay={checkboxGroup}>
              <Button >
                        <Icon type="filter" /><p style={{ float: 'right', padding: '2px' }}>Filter Category</p>
              </Button>
          </Dropdown> */}
          <AddItemForm handleAdd={this.handleAdd}/>
          <EditableContext.Provider value={this.props.form}>
            <Table
              components={components}
              bordered
              dataSource={this.state.item}
              columns={columns}
              rowClassName="editable-row"
              pagination={{
                onChange: this.cancel,
              }}
              scroll={{ x: 1500, y: 350 }}
            />
          </EditableContext.Provider>
        </Col>
      </Row>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);


export default connect((feeds)=>({feeds}))(EditableFormTable);
