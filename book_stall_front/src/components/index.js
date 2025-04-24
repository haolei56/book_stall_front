import React, { useEffect, useState } from 'react';
import Header from './Header'; // 引入头部组件
import Footer from './Footer'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';

const Index = () => {
  // 定义状态存储后端数据
  const [typeList, setTypeList] = useState([]);
  const [top1List, setTop1List] = useState([]);
  const [top2List, setTop2List] = useState([]);
  const [top3List, setTop3List] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟加入购物车的函数
  const buy = (id) => {
    console.log(`加入购物车: 商品ID ${id}`);
  };

  // 使用 useEffect 获取后端数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/index'); // 调用后端 API
        const data = await response.json(); // 解析 JSON 数据
        setTypeList(data.typeList);
        setTop1List(data.top1List);
        setTop2List(data.top2List);
        setTop3List(data.top3List);
        setLoading(false); // 数据加载完成
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, []);

  // 如果数据正在加载，显示加载提示
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* Banner 区域 */}
      {top1List.map((top) => (
        <div className="banner" key={top.good.id}>
          <div className="container">
            <h2 className="hdng">
              <a href={`detail?goodid=${top.good.id}`}>{top.good.name}</a>
              <span></span>
            </h2>
            <p>今日精选推荐</p>
            <a
              className="banner_a"
              href="javascript:;"
              onClick={() => buy(top.good.id)}
            >
              加入购物车
            </a>
            <div className="banner-text">
              <a href={`detail?goodid=${top.good.id}`}>
                <img
                  src={`../${top.good.cover}`}
                  alt={top.good.name}
                  width="350"
                  height="350"
                />
              </a>
            </div>
          </div>
        </div>
      ))}

      <div className="subscribe2"></div>

      {/* 热销推荐 */}
      <div className="gallery">
        <div className="container">
          <div className="alert alert-danger">热销推荐</div>
          <div className="gallery-grids">
            {top2List.map((top) => (
              <div
                className="col-md-4 gallery-grid glry-two"
                key={top.good.id}
              >
                <a href={`detail?goodid=${top.good.id}`}>
                  <img
                    src={`../${top.good.cover}`}
                    className="img-responsive"
                    alt={top.good.name}
                    width="350"
                    height="350"
                  />
                </a>
                <div className="gallery-info galrr-info-two">
                  <p>
                    <span
                      className="glyphicon glyphicon-eye-open"
                      aria-hidden="true"
                    ></span>
                    <a href={`detail?goodid=${top.good.id}`}>查看详情</a>
                  </p>
                  <a
                    className="shop"
                    href="javascript:;"
                    onClick={() => buy(top.good.id)}
                  >
                    加入购物车
                  </a>
                  <div className="clearfix"> </div>
                </div>
                <div className="galy-info">
                  <p>
                    {top.good.type.name} {'>'} {top.good.name}
                  </p>
                  <div className="galry">
                    <div className="prices">
                      <h5 className="item_price">¥ {top.good.price}</h5>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="clearfix"></div>

          {/* 新品推荐 */}
          <div className="alert alert-info">新品推荐</div>
          <div className="gallery-grids">
            {top3List.map((top) => (
              <div className="col-md-3 gallery-grid" key={top.good.id}>
                <a href={`detail?goodid=${top.good.id}`}>
                  <img
                    src={`../${top.good.cover}`}
                    className="img-responsive"
                    alt={top.good.name}
                  />
                </a>
                <div className="gallery-info">
                  <p>
                    <span
                      className="glyphicon glyphicon-eye-open"
                      aria-hidden="true"
                    ></span>
                    <a href={`detail?goodid=${top.good.id}`}>查看详情</a>
                  </p>
                  <a
                    className="shop"
                    href="javascript:;"
                    onClick={() => buy(top.good.id)}
                  >
                    加入购物车
                  </a>
                  <div className="clearfix"> </div>
                </div>
                <div className="galy-info">
                  <p>
                    {top.good.type.name} {'>'} {top.good.name}
                  </p>
                  <div className="galry">
                    <div className="prices">
                      <h5 className="item_price">¥ {top.good.price}</h5>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="subscribe"></div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Index;