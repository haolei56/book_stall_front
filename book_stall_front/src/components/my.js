// <%@ page language="java" contentType="text/html; charset=utf-8" %>
// <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
// <!DOCTYPE html>
// <html>
// <head>
// 	<title>个人中心</title>
// 	<meta name="viewport" content="width=device-width, initial-scale=1">
// 	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
// 	<link type="text/css" rel="stylesheet" href="css/bootstrap.css">
// 	<link type="text/css" rel="stylesheet" href="css/style.css">
// 	<script type="text/javascript" src="js/jquery.min.js"></script>
// 	<script type="text/javascript" src="js/bootstrap.min.js"></script>
// 	<script type="text/javascript" src="js/simpleCart.min.js"></script>
// </head>
// <body>

// 	<jsp:include page="header.jsp"/>
	
// 	<!--account-->
// 	<div class="account">
// 		<div class="container">
// 			<div class="register">
// 				<c:if test="${msg!=null}"><div class="alert alert-danger">${msg}</div></c:if>
// 				<form action="my" method="post"> 
// 					<input type="hidden" name="id" value="${user.id}">
// 					<div class="register-top-grid">
// 						<h3>个人中心</h3>
						
// 						<h4>收货信息</h4>
// 						<div class="input">
// 							<span>收货人<label></label></span>
// 							<input type="text" name="name" value="${user.name}" placeholder="请输入收货"> 
// 						</div>
// 						<div class="input">
// 							<span>收货电话</span>
// 							<input type="text" name="phone" value="${user.phone}" placeholder="请输入收货电话"> 
// 						</div>
// 						<div class="input">
// 							<span>收货地址</span>
// 							<input type="text" name="address" value="${user.address}" placeholder="请输入收货地址"> 
// 						</div>
// 						<div class="register-but text-center">
// 						   <input type="submit" value="提交">
// 						</div>	
// 						<hr>
// 						<h4>安全信息</h4>
// 						<div class="input">
// 							<span>原密码</span>
// 							<input type="text" name="password" placeholder="请输入原密码"> 
// 						</div>
// 						<div class="input">
// 							<span>新密码</span>
// 							<input type="text" name="passwordNew" placeholder="请输入新密码"> 
// 						</div>
// 						<div class="clearfix"> </div>
// 						<div class="register-but text-center">
// 						   <input type="submit" value="提交">
// 						</div>	
// 					</div>
// 				</form>
// 				<div class="clearfix"> </div>
// 			</div>
// 	    </div>
// 	</div>
// 	<!--//account-->

// 	<jsp:include page="footer.jsp"/>
	
// </body>
// </html>

import React, { useState } from 'react';
import Header from './Header'; // 引入头部组件
import Footer from './Footer'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // 登录功能
  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        window.location.href = data.redirect; // 跳转到首页
      } else {
        setMsg(data.message); // 显示错误消息
      }
    } catch (error) {
      console.error('登录失败:', error);
      setMsg('登录失败，请稍后再试!');
    }
  };

  // 注销功能
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.status === 'ok') {
        alert(data.message); // 显示注销成功消息
        window.location.href = '/login'; // 跳转到登录页面
      } else {
        alert('注销失败，请稍后再试');
      }
    } catch (error) {
      console.error('注销失败:', error);
      alert('注销失败，请稍后再试');
    }
  };

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* 登录页面 */}
      <div className="account">
        <div className="container">
          <div className="register">
            {/* 显示错误消息 */}
            {msg && <div className="alert alert-danger">{msg}</div>}

            <form onSubmit={handleSubmit}>
              <div className="register-top-grid">
                <h3>用户登录</h3>
                <div className="input">
                  <span>用户名 <label style={{ color: 'red' }}>*</label></span>
                  <input
                    type="text"
                    name="username"
                    placeholder="请输入用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="input">
                  <span>密码 <label style={{ color: 'red' }}>*</label></span>
                  <input
                    type="password"
                    name="password"
                    placeholder="请输入密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="register-but text-center">
                <input type="submit" value="提交" />
                <div className="clearfix"></div>
              </div>
            </form>
            <div className="clearfix"></div>
          </div>

          {/* 注销按钮 */}
          <div className="logout-button text-center">
            <button className="btn btn-danger" onClick={handleLogout}>
              注销登录
            </button>
          </div>
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Login;