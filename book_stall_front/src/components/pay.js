// <%@ page language="java" contentType="text/html; charset=utf-8" %>
// <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
// <!DOCTYPE html>
// <html>
// <head>
// 	<title>支付</title>
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
// 	<div class="cart-items">
// 		<div class="container">
// 			<h2>确认收货信息</h2>
// 			<form class="form-horizontal" action="pay" method="post" id="payform">
// 				<input type="hidden" name="id" value="${order.id}">
// 				<input type="hidden" name="paytype" id="paytype">
// 				<div class="row">
// 					<label class="control-label col-md-1">收货人</label>
// 					<div class="col-md-6">
// 						<input type="text" class="form-control" name="name" value="${user.name}" style="height:auto;padding:10px;" placeholder="输入收货人" required="required" id="fname"><br>
// 					</div>
// 				</div>
// 				<div class="row">
// 					<label class="control-label col-md-1">收货电话</label>
// 					<div class="col-md-6">
// 						<input type="text" class="form-control" name="phone" value="${user.phone}" style="height:auto;padding:10px;" placeholder="输入收货电话" required="required" id="fphone"><br>
// 					</div>
// 				</div>
// 				<div class="row">
// 					<label class="control-label col-md-1">收货地址</label>
// 					<div class="col-md-6">
// 						<input type="text" class="form-control" name="address" value="${user.address}" style="height:auto;padding:10px;" placeholder="输入收货地址" required="required" id="faddress"><br>
// 					</div>
// 				</div>
// 			</form>
			
// 			<br><hr><br>
			
// 			<h2>选择支付方式</h2>
// 			<h3>订单编号: ${order.id}  支付金额: ${order.total}</h3><br><br>
// 			<div class="col-sm-6 col-md-4 col-lg-3 ">
// 				<div class="thumbnail">
// 					<a href="javascript:dopay(1);"> 
// 						<img src="images/wechat.jpg" alt="微信支付">
// 					</a>
// 				</div>
// 			</div>
// 			<div class="col-sm-6 col-md-4 col-lg-3 ">
// 				<div class="thumbnail">
// 					<a href="javascript:dopay(2);"> 
// 						<img src="images/alipay.jpg" alt="支付宝支付">
// 					</a>
// 				</div>
// 			</div>
// 			<div class="col-sm-6 col-md-4 col-lg-3 ">
// 				<div class="thumbnail">
// 					<a href="javascript:dopay(3);"> 
// 						<img src="images/offline.jpg" alt="货到付款">
// 					</a>
// 				</div>
// 			</div>
// 		</div>
// 	</div>

// 	<jsp:include page="footer.jsp"/>
	
// <script type="text/javascript">
// 	function dopay(paytype){
// 		// 信息校验
// 		var name = $("#fname").val();
// 		if(name==null || name==""){
// 			layer.msg("请正确填写收货人!");
// 			return;
// 		}
// 		var phone = $("#fphone").val();
// 		if(phone==null || phone=="" || !/^[0-9]*$/.test(phone)){
// 			layer.msg("请正确填写收货电话!");
// 			return;
// 		}
// 		var address = $("#faddress").val();
// 		if(address==null || address==""){
// 			layer.msg("请正确填写收货地址!");
// 			return;
// 		}
		
// 		$("#paytype").val(paytype);
// 		$("#payform").submit();
// 	}
// </script>

// </body>
// </html>

import React, { useEffect, useState } from 'react';
import Header from './Header'; // 引入头部组件
import Footer from './Footer'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';

const Pay = ({ orderid }) => {
  const [order, setOrder] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  // 获取订单信息
  const fetchOrderInfo = async () => {
    try {
      const response = await fetch(`/api/topay?orderid=${orderid}`);
      const data = await response.json();

      if (data.status === 'ok') {
        setOrder(data.order);
      } else {
        setMsg(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('获取订单信息失败:', error);
      setMsg('获取订单信息失败，请稍后再试!');
      setLoading(false);
    }
  };

  // 提交支付信息
  const handlePayment = async (paytype) => {
    if (!order) return;

    // 校验收货信息
    if (!order.name || !order.phone || !order.address) {
      setMsg('请填写完整的收货信息!');
      return;
    }

    try {
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...order, paytype }),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        window.location.href = data.redirect; // 跳转到支付成功页面
      } else {
        setMsg(data.message);
      }
    } catch (error) {
      console.error('支付失败:', error);
      setMsg('支付失败，请稍后再试!');
    }
  };

  useEffect(() => {
    fetchOrderInfo();
  }, [orderid]);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      <div className="cart-items">
        <div className="container">
          {/* 显示消息 */}
          {msg && <div className="alert alert-danger">{msg}</div>}

          {order ? (
            <>
              <h2>确认收货信息</h2>
              <div className="form-horizontal">
                <div className="row">
                  <label className="control-label col-md-1">收货人</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={order.name || ''}
                      onChange={(e) => setOrder({ ...order, name: e.target.value })}
                      placeholder="输入收货人"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="control-label col-md-1">收货电话</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={order.phone || ''}
                      onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                      placeholder="输入收货电话"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <label className="control-label col-md-1">收货地址</label>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      value={order.address || ''}
                      onChange={(e) => setOrder({ ...order, address: e.target.value })}
                      placeholder="输入收货地址"
                      required
                    />
                  </div>
                </div>
              </div>

              <br />
              <hr />
              <br />

              <h2>选择支付方式</h2>
              <h3>
                订单编号: {order.id} 支付金额: ¥ {order.total}
              </h3>
              <br />
              <div className="row">
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="thumbnail">
                    <button onClick={() => handlePayment(1)}>
                      <img src="images/wechat.jpg" alt="微信支付" />
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="thumbnail">
                    <button onClick={() => handlePayment(2)}>
                      <img src="images/alipay.jpg" alt="支付宝支付" />
                    </button>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4 col-lg-3">
                  <div className="thumbnail">
                    <button onClick={() => handlePayment(3)}>
                      <img src="images/offline.jpg" alt="货到付款" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="alert alert-info">订单不存在</div>
          )}
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Pay;