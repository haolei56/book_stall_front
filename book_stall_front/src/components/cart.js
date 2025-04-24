import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const Cart = () => {
  const [msg, setMsg] = useState('');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      setMsg(data.msg);
      setOrder(data.order);
      setLoading(false);
    } catch (error) {
      console.error('获取购物车数据失败:', error);
    }
  };

  const handleBuy = async (goodid) => {
    try {
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goodid }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        fetchCart(); // 重新加载购物车数据
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('购买失败:', error);
    }
  };

  const handleLessen = async (goodid) => {
    try {
      const response = await fetch('/api/lessen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goodid }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        fetchCart(); // 重新加载购物车数据
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('减少商品失败:', error);
    }
  };

  const handleDelete = async (goodid) => {
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goodid }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        fetchCart(); // 重新加载购物车数据
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('删除商品失败:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.status === 'ok') {
        window.location.href = data.redirect; // 跳转到支付页面
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('提交订单失败:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Header />
      <div className="cart-items">
        <div className="container">
          {msg && <div className="alert alert-success">{msg}</div>}
          {order ? (
            <>
              <h2>我的购物车</h2>
              {order.itemList.map((item) => (
                <div className="cart-header col-md-6" key={item.good.id}>
                  <div className="cart-sec simpleCart_shelfItem">
                    <div className="cart-item cyc">
                      <a href={`detail?goodid=${item.good.id}`}>
                        <img
                          src={`../${item.good.cover}`}
                          className="img-responsive"
                          alt={item.good.name}
                        />
                      </a>
                    </div>
                    <div className="cart-item-info">
                      <h3>
                        <a href={`detail?goodid=${item.good.id}`}>
                          {item.good.name}
                        </a>
                      </h3>
                      <h3>
                        <span>单价: ¥ {item.good.price}</span>
                      </h3>
                      <h3>
                        <span>数量: {item.amount}</span>
                      </h3>
                      <button
                        className="btn btn-info"
                        onClick={() => handleBuy(item.good.id)}
                      >
                        增加
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handleLessen(item.good.id)}
                      >
                        减少
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.good.id)}
                      >
                        删除
                      </button>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              ))}
              <div className="cart-header col-md-12">
                <hr />
                <h3>订单总金额: ¥ {order.total}</h3>
                <button
                  className="btn btn-success btn-lg"
                  style={{ marginLeft: '74%' }}
                  onClick={handleSave}
                >
                  提交订单
                </button>
              </div>
            </>
          ) : (
            <div className="alert alert-info">空空如也</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;