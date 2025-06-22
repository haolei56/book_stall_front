// <%@ page language="java" contentType="text/html; charset=utf-8" %>
// <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
// <!DOCTYPE html>
// <html>
// <head>
// 	<title>用户登录</title>
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
// 				<form action="login" method="post"> 
// 					<div class="register-top-grid">
// 						<h3>用户登录</h3>
// 						<div class="input">
// 							<span>用户名 <label style="color:red;">*</label></span>
// 							<input type="text" name="username" placeholder="请输入用户名" required="required"> 
// 						</div>
// 						<div class="input">
// 							<span>密码 <label style="color:red;">*</label></span>
// 							<input type="text" name="password" placeholder="请输入密码" required="required"> 
// 						</div>
// 						<div class="clearfix"> </div>
// 					</div>
// 					<div class="register-but text-center">
// 					   <input type="submit" value="提交">
// 					   <div class="clearfix"> </div>
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

  const handleSubmit = async (e) => {
    e.preventDefault(); // 阻止表单默认提交行为

    try {
      const response = await fetch('/index/login', {
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
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Login;