import "../styles/Orders.css";
import React from 'react'
import {Card, Table} from 'antd'
import 'antd/dist/antd.css';

class BasicTable extends React.Component{

  constructor(props){
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    //构造一些初始数据
    const data = [
      {
        id: 1,
        name: 'User1',
        source: 'Calton',
        date: "2021-5-1 13:22:04",
        data: 'download'
      },
      {
        id: 2,
        name: 'User1',
        source: '666 Swanston Street',
        date: "2021-5-2 23:24:06",
        data: 'download'
      },
    ];

    this.setState({
      dataSource : data
    })
  }


  render() {

    //定义表头，一般放在render()中
    const columns = [
      {
        title:'Id',         //列名称
        dataIndex:'id'      //数据源的字段名
      },
      {
        title:'Account Name',
        dataIndex:'name'
      },
      {
        title:'Location',
        dataIndex:'source'
      },
      {
        title:'Date',
        dataIndex:'date'
      },
      {
        title:'Download',
        dataIndex:'data'
      }
    ]


    return (
      <div>
        <Card title={"History of Downloads"}>
          
          <Table columns={columns} dataSource={this.state.dataSource} bordered>
          </Table>
        </Card>
      </div>
    )
  }

}

export default BasicTable;
