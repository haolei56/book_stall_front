import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

// useState 用于管理组件的状态，useEffect 用于处理副作用（如数据获取）。
// 定义一个名为 Cart 的函数组件。
const Cart = () => {
  // 定义一个状态变量 msg，用于存储提示信息，初始值为空字符串。
  //setMsg是一个函数，用于更新 msg 的值。例如：setMsg('购物车加载成功');
  const [msg, setMsg] = useState('');
  const [order, setOrder] = useState(null);
  // 定义一个状态变量 loading，用于表示数据是否正在加载，初始值为 true。
  const [loading, setLoading] = useState(true);

  // 定义一个异步函数 fetchCart，用于从后端获取购物车数据。
  //async 用于声明一个函数为异步函数。
  //await 用于等待一个 Promise 的完成。const result = await promise; 它只能在 async 函数中使用。在等待期间，代码的执行会暂停，直到 Promise 完成。
  const fetchCart = async () => {
    try {
      // 等待 fetch 请求完成。使用 fetch API 调用后端的 /index/cart 接口获取购物车数据。如果没有指定 method，fetch 默认使用 GET 方法。
      const response = await fetch('/index/cart');
      // 等待 JSON 数据解析完成
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
      //JSON.stringify是 JavaScript 中的一个方法，用于将 JavaScript 对象或值转换为 JSON 格式的字符串。
      //{ goodid } 是一个对象，包含一个名为 goodid 的属性。JSON.stringify({ goodid }) 会将这个对象转换为 JSON 字符串
      //例如，如果 goodid 的值是 123，那么转换后的字符串会是：'{"goodid":123}'。
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goodid }),
      });
      const data = await response.json();
      if (data.status === 'ok') {
        fetchCart(); // 重新加载购物车数据
      } else {
        //alert是一个简单的浏览器 API，用于显示消息给用户。
        //它会弹出一个模态对话框，显示指定的文本内容，并阻止用户与页面的其他部分交互，直到用户关闭对话框。
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
        //window.location.href 是 JavaScript 中用于获取或设置当前页面 URL 的属性。
        //当给它赋值时，浏览器会立即导
        //data.redirect 是一个变量，通常是从服务器返回的数据中提取的属性。
        window.location.href = data.redirect; // 跳转到支付页面
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('提交订单失败:', error);
    }
  };

  //使用 useEffect Hook，在组件加载时调用 fetchCart 函数。
  //空依赖数组表示该副作用只在组件挂载时执行一次。
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