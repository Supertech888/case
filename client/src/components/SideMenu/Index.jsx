import { Menu, Tag ,Avatar, Badge, Space,Switch  } from 'antd'
import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BugOutlined  ,SyncOutlined ,HomeOutlined , DashboardOutlined , FormOutlined ,UnorderedListOutlined ,LoadingOutlined ,UserOutlined ,EditOutlined ,TeamOutlined,TableOutlined } from '@ant-design/icons'
import { listCases } from '../../api/case'



const SideMenu = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([]);



  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases()
      .then((res) => {
        //console.log("ทดสอบนะ", res.data);

        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleAddData = () => {
   
  //   loadData();
  // };

//change theme
const [theme, setTheme] = useState('light');
const changeTheme = (value) => {
  setTheme(value ? 'dark' : 'light');
};

  return (
    <div className="SideMenu">
       <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
      theme={theme}
      mode='inline'
        onClick={(item) => {
          //item.key
          navigate(item.key);
          
        }}
        items={[
          {
            label: "Dashboard",
            key: "/dashboard/app",
            icon: <DashboardOutlined />
          },
          {
            label: "หน้าการทำงาน",
            key: "homework", 
            icon: <HomeOutlined /> ,
            children:[{
              label: "ฟอร์มบันทึกเคส",
              key: "/dashboard/formcontrol",
              icon: <FormOutlined />,
              // handleAddData: handleAddData()
            },
            {
              label: (
                <span>
                  รายการเคสทั้งหมด{' '}
                  <Badge
                    
                    count={data.filter((data) => data._id).length}
                    style={{ backgroundColor: '#52BE80', fontWeight: 'bold', animation: 'blinking 1s infinite'}}
                  />
                </span>
            ),
              key: "/dashboard/listcase",
              icon: <UnorderedListOutlined />
            },
            {
              label: (
                <span>
                  รายการเคสที่รอการแก้ไข{' '}
                  <Badge
                    
                    count={data.filter((data) => data.status === 'รอการแก้ไข').length}
                    style={{ backgroundColor: '#E74C3C ', fontWeight: 'bold', animation: 'blinking 1s infinite'}}
                  />
                </span>
            ),
              key: "/dashboard/listunresolve",
              icon:<BugOutlined />,
              // badge: <Badge count={data.filter((data) => data.status === 'รอการแก้ไข').length} />

              
            },
            ]
          },
         
          {
            label: "Customers",
            key: "user",
            icon:<UserOutlined />,
              children:[
                {
                  label: "ตารางวันทำงาน",
                  key: "/dashboard/reset-password",
                  icon:<TableOutlined  />
                },
                {
                  label: "สมาชิกทั้งหมด",
                  key: "/dashboard/listuser",
                  icon:<TeamOutlined />
                }
              ]
          },
        ]}



               // ส่งฟังก์ชัน handleAddData ไปยัง FormControl component       






        
      ></Menu>
      
    </div>
  );
}

export default SideMenu 