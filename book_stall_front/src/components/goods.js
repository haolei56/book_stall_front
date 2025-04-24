import React, { useEffect, useState } from 'react';
import Header from './Header'; // 引入头部组件
import Footer from './Footer'; // 引入底部组件
import '../assets/css/bootstrap.css'; // 引入样式
import '../assets/css/style.css';

const Goods = ({ typeid, searchQuery }) => {
  const [type, setType] = useState(null);
  const [goodList, setGoodList] = useState([]);
  const [pageTool, setPageTool] = useState(null);
  const [loading, setLoading] = useState(true);

  // 模拟加入购物车的函数
  const buy = (id) => {
    console.log(`加入购物车: 商品ID ${id}`);
  };

  // 使用 useEffect 获取后端数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = searchQuery
          ? `/api/search?name=${searchQuery}`
          : `/api/goods?typeid=${typeid}`;
        const response = await fetch(url);
        const data = await response.json();

        // 更新状态
        setType(data.type || null);
        setGoodList(data.goodList || []);
        setPageTool(data.pageTool || null);
        setLoading(false); // 数据加载完成
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, [typeid, searchQuery]);

  // 如果数据正在加载，显示加载提示
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      {/* 头部组件 */}
      <Header />

      {/* 商品列表 */}
      <div className="products">
        <div className="container">
          {/* 分类标题 */}
          <h2>{type?.name || (typeid === 2 ? '热销推荐' : '新品推荐')}</h2>

          {/* 商品列表 */}
          <div className="col-md-12 product-model-sec">
            {goodList.map((good) => (
              <div className="product-grid" key={good.id}>
                <a href={`detail?goodid=${good.id}`}>
                  <div className="more-product">
                    <span> </span>
                  </div>
                  <div className="product-img b-link-stripe b-animate-go thickbox">
                    <img
                      src={`../${good.cover}`}
                      className="img-responsive"
                      alt={good.name}
                      width="240"
                      height="240"
                    />
                    <div className="b-wrapper">
                      <h4 className="b-animate b-from-left b-delay03">
                        <button>查看详情</button>
                      </h4>
                    </div>
                  </div>
                </a>
                <div className="product-info simpleCart_shelfItem">
                  <div className="product-info-cust prt_name">
                    <h4>{good.name}</h4>
                    <span className="item_price">¥ {good.price}</span>
                    <input
                      type="button"
                      className="item_add items"
                      value="加入购物车"
                      onClick={() => buy(good.id)}
                    />
                    <div className="clearfix"> </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="clearfix"> </div>
          </div>

          {/* 分页工具 */}
          <div dangerouslySetInnerHTML={{ __html: pageTool }}></div>
        </div>
      </div>

      {/* 底部组件 */}
      <Footer />
    </div>
  );
};

export default Goods;