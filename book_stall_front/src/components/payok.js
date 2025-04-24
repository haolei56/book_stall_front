// <%@ page language="java" contentType="text/html; charset=utf-8" %>
// <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
// <!DOCTYPE html>
// <html>
// <head>
// 	<title>支付成功</title>
// 	<meta name="viewport" content="width=device-width, initial-scale=1">
// 	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
// 	<link type="text/css" rel="stylesheet" href="css/bootstrap.css">
// 	<link type="text/css" rel="stylesheet" href="css/style.css">
// 	<script type="text/javascript" src="js/jquery.min.js"></script>
// 	<script type="text/javascript" src="js/bootstrap.min.js"></script>
// 	<script type="text/javascript" src="layer/layer.js"></script>
// 	<script type="text/javascript" src="js/cart.js"></script>
// </head>
// <body>
	
// 	<jsp:include page="header.jsp"/>
	
// 	<!--cart-items-->
// 	<div class="cart-items">
// 		<div class="container">
		
// 			<c:if test="${msg!=null}"><div class="alert alert-success">${msg}</div></c:if>
			
// 			<p><a class="btn btn-success" href="order">查看我的订单</a></p>
// 		</div>
// 	</div>
// 	<!--//cart-items-->	
	
// 	<jsp:include page="footer.jsp"/>

// </body>
// </html>

import React, { useEffect, useState } from 'react';
import Header from './Header'; // 引入头部组件
import Footer from './Footer'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';

const PaySuccess = ({ orderid }) => {
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // 获取支付成功信息
  const fetchPaymentSuccessInfo = async () => {
    try {
      const response = await fetch(`/api/payok?orderid=${orderid}`);
      const data = await response.json();

      if (data.status === 'ok') {
        setMsg(data.message);
      } else {
        setMsg(data.message || '获取支付信息失败，请稍后再试!');
      }
      setLoading(false);
    } catch (error) {
      console.error('获取支付信息失败:', error);
      setMsg('获取支付信息失败，请稍后再试!');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentSuccessInfo();
  }, [orderid]);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* 支付成功页面 */}
      <div className="cart-items">
        <div className="container">
          {/* 显示支付成功消息 */}
          {msg && <div className="alert alert-success">{msg}</div>}

          {/* 查看订单按钮 */}
          <p>
            <a className="btn btn-success" href="/order">
              查看我的订单
            </a>
          </p>
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default PaySuccess;