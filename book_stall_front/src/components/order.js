// <%@ page language="java" contentType="text/html; charset=utf-8" %>
// <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
// <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
// <!DOCTYPE html>
// <html>
// <head>
// 	<title>我的订单</title>
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
		
// 		<c:if test="${msg!=null}"><div class="alert alert-success">${msg}</div></c:if>
// 		<c:if test="${orderList!=null}">
// 			<h2>我的订单</h2>
			
// 				<table class="table table-bordered table-hover">

// 				<tr>
// 					<th width="10%">ID</th>
// 					<th width="10%">总价</th>
// 					<th width="20%">商品详情</th>
// 					<th width="20%">收货信息</th>
// 					<th width="10%">订单状态</th>
// 					<th width="10%">支付方式</th>
// 					<th width="10%">下单时间</th>
// 					<th width="10%">操作</th>
// 				</tr>
// 				<c:forEach var="order" items="${orderList}">
// 			         <tr>
// 			         	<td><p>${order.id}</p></td>
// 			         	<td><p>${order.total}</p></td>
// 			         	<td>
// 				         	<c:forEach var ="item" items="${order.itemList}">
// 					         	<p>${item.good.name}(${item.price}) x ${item.amount}</p>
// 				         	</c:forEach>
// 			         	</td>
// 			         	<td>
// 			         		<p>${order.name}</p>
// 			         		<p>${order.phone}</p>
// 			         		<p>${order.address}</p>
// 			         	</td>
// 						<td>
// 							<p>
// 								<c:if test="${order.status==1}">未付款</c:if>
// 								<c:if test="${order.status==2}"><span style="color:red;">已付款</span></c:if>
// 								<c:if test="${order.status==3}">配送中</c:if>
// 								<c:if test="${order.status==4}">已完成</c:if>
// 							</p>
// 						</td>
// 						<td>
// 							<p>
// 								<c:if test="${order.paytype==1}">微信</c:if>
// 								<c:if test="${order.paytype==2}">支付宝</c:if>
// 								<c:if test="${order.paytype==3}">货到付款</c:if>
// 							</p>
// 						</td>
// 						<td><p><fmt:formatDate value="${order.systime}" pattern="yyyy-MM-dd HH:mm:ss" /></p></td>
// 						<td>
// 							<c:if test="${order.status==1}">
// 								<a class="btn btn-success" href="topay?orderid=${order.id}">支付</a>
// 							</c:if>
// 						</td>
// 			       	</tr>
// 				</c:forEach>
			     
// 			</table>
			
// 			</c:if>
// 			<c:if test="${orderList==null}"><div class="alert alert-info">空空如也</div></c:if>
			
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

const Order = () => {
  const [orderList, setOrderList] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // 获取订单数据
  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/order');
      const data = await response.json();

      if (data.status === 'ok') {
        setOrderList(data.orderList);
      } else {
        setMsg(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('获取订单数据失败:', error);
      setMsg('获取订单数据失败，请稍后再试!');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* 订单页面 */}
      <div className="cart-items">
        <div className="container">
          {/* 显示消息 */}
          {msg && <div className="alert alert-danger">{msg}</div>}

          {/* 如果有订单 */}
          {orderList.length > 0 ? (
            <>
              <h2>我的订单</h2>
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th width="10%">ID</th>
                    <th width="10%">总价</th>
                    <th width="20%">商品详情</th>
                    <th width="20%">收货信息</th>
                    <th width="10%">订单状态</th>
                    <th width="10%">支付方式</th>
                    <th width="10%">下单时间</th>
                    <th width="10%">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>¥ {order.total}</td>
                      <td>
                        {order.itemList.map((item) => (
                          <p key={item.good.id}>
                            {item.good.name} (¥ {item.price}) x {item.amount}
                          </p>
                        ))}
                      </td>
                      <td>
                        <p>{order.name}</p>
                        <p>{order.phone}</p>
                        <p>{order.address}</p>
                      </td>
                      <td>
                        {order.status === 1 && '未付款'}
                        {order.status === 2 && <span style={{ color: 'red' }}>已付款</span>}
                        {order.status === 3 && '配送中'}
                        {order.status === 4 && '已完成'}
                      </td>
                      <td>
                        {order.paytype === 1 && '微信'}
                        {order.paytype === 2 && '支付宝'}
                        {order.paytype === 3 && '货到付款'}
                      </td>
                      <td>{new Date(order.systime).toLocaleString()}</td>
                      <td>
                        {order.status === 1 && (
                          <a className="btn btn-success" href={`topay?orderid=${order.id}`}>
                            支付
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div className="alert alert-info">空空如也</div>
          )}
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Order;