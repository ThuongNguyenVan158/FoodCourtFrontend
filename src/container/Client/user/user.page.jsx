import React, { useState, useEffect } from "react";
import { useStyles } from "./user.style.page";
import { Container } from "@mui/material";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Grid } from "@mui/material";
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setLoginAction } from './../../../redux/Reducers/loginUser';
import ItemOrder from "../../../components/ItemOrder/ItemOrder.component";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function UserPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const data = useSelector(state => state.loginUser);

  const [newData, setNewData] = React.useState({
    createAt: '',
    email: data.userInfo.email,
    id: data.userInfo.id,
    name: data.userInfo.name,
    password: '',
    phone: data.userInfo.phone,
    updateAt: '',
    username: data.userInfo.username,
  });

  const handleChangeUserInfo = (e) => {
    const { name, value} = e.target;
    setNewData({...newData, [name]: value});
  }

  const handleUpdate = async (e) => {
    try {
      const result = await axios.put( `https://project1952001.herokuapp.com/api/v1/customer/updatecus/${data.userInfo.id}`, newData,{
          headers: {
            token: JSON.parse(localStorage.getItem('user')).token,
          },
        },
      );
      alert('C???p nh???t th??nh c??ng!');
      const payload = {
        isLogin: true,
        userInfo: {
          email: newData.email,
          id: data.userInfo.id,
          name: newData.name,
          phone: newData.phone,
          username: newData.username,
        },
      }
      const local = JSON.parse(localStorage.getItem('user'));
      local.customer = payload.userInfo;
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(local));
      dispatch(setLoginAction(payload));
    } catch (err) {
      alert("C???p nh???t th??ng tin kh??ng th??nh c??ng!");
    }
  }

  const [pass, setPass] = React.useState({
    password: '',
  })

  const handleChangePass = (e) => {
    const { name, value } = e.target;
    setPass({...pass, [name]: value});
  }

  const handleUpdatePass = async (e) => {
    if (pass.password !== document.getElementById('cfpass').value)
    {
      alert("M???t kh???u kh??ng kh???p!");
      return;
    }
    try {
      console.log('1');
      console.log(pass);
      const result = await axios.put(`https://project1952001.herokuapp.com/api/v1/customer/changePwd/${data.userInfo.id}`, pass, {
        headers: {
          token: JSON.parse(localStorage.getItem('user')).token,
        },
      })
      console.log(result.data);
      alert("Thay ?????i m???t kh???u th??nh c??ng!");
    } catch (err) {
      alert("Thay ?????i m???t kh???u kh??ng th??nh c??ng!")
    }
  }

  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const result = await axios.get(`https://project1952001.herokuapp.com/api/v1/order/list/${data.userInfo.id}`, {
        headers: {
          token: JSON.parse(localStorage.getItem('user')).token,
        }
      })
      setOrders(result.data[0].Orders);
    }
    catch (error) {}
  }

  useEffect(() => {
    getOrders();
  }, [])

  console.log(orders);

  return (
    <div className={classes.root}>
      <Container>
        <div style={{ height: "74px" }}></div>
        <div className={classes.flexBox}>
          <div className={classes.box}>
            <div className={classes.boxleft}>
              <div className={classes.content}>
                <div className={classes.avtbox}>
                  <div className={classes.avt}></div>
                </div>
                <div>
                  <h5>{data.userInfo.name}</h5>
                </div>
                <div>
                  <p>{data.userInfo.email}</p>
                </div>
                <div className={classes.boxTabs}>
                  <Box>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={value}
                      onChange={handleChange}
                      aria-label="Vertical tabs example"
                      sx={{ borderRight: 1, borderColor: "divider" }}
                    >
                      <Tab label="Th??ng Tin T??i Kho???n" {...a11yProps(0)} />
                      <Tab label="?????i M???t Kh???u" {...a11yProps(1)} />
                      <Tab label="L???ch s??? mua h??ng" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                </div>
              </div>
            </div>

            <div className={classes.boxright}>
              <div className={classes.content}>
                <TabPanel value={value} index={0}>
                  <div className={classes.mainBox}>
                    <form autoComplete="off">
                      <h3>TH??NG TIN T??I KHO???N</h3>
                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Email</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            onChange={handleChangeUserInfo}
                            type="email"
                            name="email"
                            placeholder={data.userInfo.email}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>T??n ????ng nh???p</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            onChange={handleChangeUserInfo}
                            type="text"
                            name="username"
                            placeholder={data.userInfo.username}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>H??? v?? t??n</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            onChange={handleChangeUserInfo}
                            type="text"
                            name="name"
                            placeholder={data.userInfo.name}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>S??? ??i???n tho???i</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            onChange={handleChangeUserInfo}
                            type="tel"
                            name="phone"
                            placeholder={data.userInfo.phone}
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p></p>
                        </div>
                        <div className={classes.rightitem}>
                          <Button onClick={handleUpdate} variant="contained">
                            C???p Nh???t
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div className={classes.mainBox}>
                    <form autoComplete="off">
                      <h3>?????I M???T KH???U</h3>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>M???t kh???u m???i</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            onChange={handleChangePass}
                            type="password"
                            name="password"
                            placeholder=""
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p>Nh???p l???i m???t kh???u</p>
                        </div>
                        <div className={classes.rightitem}>
                          <input
                            type="password"
                            id="cfpass"
                            placeholder=""
                          ></input>
                        </div>
                      </div>

                      <div className={classes.item}>
                        <div className={classes.leftitem}>
                          <p></p>
                        </div>
                        <div className={classes.rightitem}>
                          <Button onClick={handleUpdatePass} variant="contained">
                            C???p Nh???t
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <div className={classes.mainBox}>
                    <h3>L???CH S??? MUA H??NG</h3>

                    <div className={classes.listorder}>
                      <div className={classes.headerorder}>
                        <Grid container spacing={2}>
                          <Grid item xs={1}>
                            ID
                          </Grid>
                          <Grid item xs={3}>
                            Ng??y thanh to??n
                          </Grid>
                          <Grid item xs={3}>
                            T???ng ti???n thanh to??n
                          </Grid>
                          <Grid item xs={4}>
                            Ph????ng th???c thanh to??n
                          </Grid>
                        </Grid>
                      </div>
                      
                      {
                        orders.map((order, index) => {
                          return (
                            <div key={index}>
                              <ItemOrder order={order}/>
                            </div>
                          )
                        }, '')
                      }

                    </div>

                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UserPage;
