import React, { Fragment, useEffect, useState } from 'react'
import mainHoc from '../hoc/mainHoc'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import pendingUsers from '../../redux/action/user/pendingUsers';
import CheckSquareTwoTone from '@ant-design/icons/CheckSquareTwoTone'
import CloseCircleTwoTone from '@ant-design/icons/CloseCircleTwoTone'
import socket from '../../Socket';


const Dashboard = () => {
  let state = useSelector((state) => state)
  let [userData, setUserData] = useState([])
  let [pendingPage, setPandingPage] = useState(true);
  let [approvedPage, setApprovedPage] = useState(true);
  let [allPage, setAllPage] = useState(true);
  let [rejectedPage, setRejectedPage] = useState(true);
  let [approveObj, setApproveObject] = useState({ _id: "", status: "" })
  let dispatch = useDispatch()
  const columns = [
    {
      title: 'Id',
      dataIndex: '_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (item, record, index) => <Fragment>
        <select defaultValue='4' className='form-control' onChange={(e) => { typeChange(e, record) }}>
          <option value="0">Admin</option>
          <option value="1">Developer</option>
          <option value="2">Designer</option>
          <option value="3">Guest</option>
        </select>
      </Fragment>,
      hidden: pendingPage,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (item, record, index) =>
        <Fragment>
          <CheckSquareTwoTone onClick={() => { userAction("approve", record) }} className='userIcon' key={index} />
          <CloseCircleTwoTone onClick={() => { userAction("reject", record) }} className='userIcon' />
        </Fragment>,
      hidden: pendingPage,
    },
  ].filter(item => !item.hidden);

  const userAction = (action, data) => {
    approveObj._id = data._id;
    approveObj.status = 1
    if (action === "approve") {
      socket.emit('user|status', approveObj)
      socket.on('user|status', (response) => {
      })
    }
    else {
      socket.emit('user|status', { _id: data._id, status: 2 })
      socket.on('user|status', (response) => {
      })
    }
  }

  useEffect(() => {
    console.log(state.user.forEach((obj) => {
      console.log(obj)
    }))
    if (state.user.find((obj) => obj.status)) {
      setPandingPage(true)
    } else {
      setPandingPage(false)
    }
    setUserData(state.user)
  }, [state])

  useEffect(() => {
    dispatch(pendingUsers())
  }, [])

  const typeChange = (e, data) => {
    socket.emit('user|type', { _id: data._id, type: e.target.value })
    socket.on('user|type', (response) => {
    })
  }

  return (
    <Fragment>
      <div className="project">
        <h2>Create Project</h2>
        <div className="body">
          <div className="d-lg-flex d-md-flex">
            <div className="form-group sname">
              <label htmlFor="sname">Short Name</label>
              <input type="text" id="sname" name="sname" className="form-control" /* class="Short Name" */ placeholder="Short Name" />
            </div>
            <div className="form-group name">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" className="form-control" /* class="Name" */ placeholder="Name" />
            </div>
            <div className="form-group pname">
              <label htmlFor="pname">Package Name</label>
              <input type="text" id="pname" name="pname" className="form-control" /* class="Package Name" */ placeholder="Package Name" />
            </div>
            <div className="form-group platform">
              <label htmlFor="platform">Platform</label>
              <select name="platform" id="platform" className="form-control">
                <option value="ios" selected>IOS</option>
                <option value="Android">Android</option>
              </select>
            </div>
            <div className="form-group d-flex align-items-end">
              <button className="btn">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div className="project-records">
        <div className="header">
          <div className="row">
            <div className="col-lg-6 col-md-4 left">
              <h2>Project Records</h2>
            </div>
            <div className="col-lg-6 col-md-8 right d-lg-flex d-md-flex justify-content-end">
              <div className="form-group platform">
                <label htmlFor="platform">Platform</label>
                <select name="platform" id="platform" className="form-control">
                  <option value="ios">IOS</option>
                  <option value="android">Android</option>
                </select>
                <i className="ri-arrow-down-s-line"></i>
              </div>
              <div className="form-group status">
                <label htmlFor="status">Status</label>
                <select name="status" id="status" className="form-control">
                  <option value="Active">Active</option>
                  <option value="Disable">Disable</option>
                </select>
                <i className="ri-arrow-down-s-line"></i>
              </div>
              <div className="form-group d-flex align-items-end search">
                <input type="search" className="form-control" placeholder="search text" />
                <i className="ri-search-line search-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="body table-responsive">
          <Table columns={columns} dataSource={userData} size="small" />
        </div>
      </div>
    </Fragment>
  )
}

export default mainHoc(Dashboard)








