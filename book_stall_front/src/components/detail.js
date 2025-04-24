import React, { useEffect, useState } from 'react';
import Header from './Header.js'; // 引入头部组件
import Footer from './Footer.js'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';
import '../assets/css/flexslider.css';
import $ from 'jquery'; // 引入 jQuery
import '../assets/js/jquery.flexslider.js'; // 引入 FlexSlider

const Detail = ({ goodid }) => {
  // 定义状态存储后端数据
  const [good, setGood] = useState(null);
  const [typeList, setTypeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 模拟加入购物车的函数
  const buy = (id) => {
    console.log(`加入购物车: 商品ID ${id}`);
  };

  // 使用 useEffect 获取后端数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 调用后端 API 获取数据
        const response = await fetch(`/api/detail?goodid=${goodid}`);
        const data = await response.json();

        // 更新状态
        setGood(data.good);
        setTypeList(data.typeList);
        setLoading(false); // 数据加载完成
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();

    // 初始化 FlexSlider
    $('.flexslider').flexslider({
      animation: 'slide',
      controlNav: 'thumbnails',
    });
  }, [goodid]);

  // 如果数据正在加载，显示加载提示
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* 商品详情页面 */}
      <div className="single">
        <div className="container">
          <div className="single-grids">
            {/* 商品图片轮播 */}
            <div className="col-md-4 single-grid">
              <div className="flexslider">
                <ul className="slides">
                  <li data-thumb={`../${good.cover}`}>
                    <div className="thumb-image">
                      <img
                        src={`../${good.cover}`}
                        alt={good.name}
                        className="img-responsive"
                      />
                    </div>
                  </li>
                  <li data-thumb={`../${good.image1}`}>
                    <div className="thumb-image">
                      <img
                        src={`../${good.image1}`}
                        alt={good.name}
                        className="img-responsive"
                      />
                    </div>
                  </li>
                  <li data-thumb={`../${good.image2}`}>
                    <div className="thumb-image">
                      <img
                        src={`../${good.image2}`}
                        alt={good.name}
                        className="img-responsive"
                      />
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 商品信息 */}
            <div className="col-md-4 single-grid simpleCart_shelfItem">
              <h3>{good.name}</h3>
              <div className="tag">
                <p>
                  分类 :{' '}
                  <a href={`goods?typeid=${good.type.id}`}>{good.type.name}</a>
                </p>
              </div>
              <p>介绍: {good.intro}</p>
              <div className="galry">
                <div className="prices">
                  <h5 className="item_price">¥ {good.price}</h5>
                </div>
                <div className="clearfix"></div>
              </div>
              <div className="btn_form">
                <a
                  href="javascript:;"
                  className="add-cart item_add"
                  onClick={() => buy(good.id)}
                >
                  加入购物车
                </a>
              </div>
            </div>

            {/* 商品分类 */}
            <div className="col-md-4 single-grid1">
              <ul>
                {typeList.map((type) => (
                  <li key={type.id}>
                    <a href={`goods?typeid=${type.id}`}>{type.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="clearfix"> </div>
          </div>
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Detail;