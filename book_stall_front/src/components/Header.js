import React from 'react';

const Header = ({ flag, typeList, user, order }) => {
  return (
    <div className="header">
      <div className="container">
        <nav className="navbar navbar-default" role="navigation">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <h1 className="navbar-brand">
              <a href="index">图书商城</a>
            </h1>
          </div>
          {/* navbar-header */}
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li>
                <a href="index" className={flag === 1 ? 'active' : ''}>
                  首页
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="#"
                  className={`dropdown-toggle ${flag === 2 ? 'active' : ''}`}
                  data-toggle="dropdown"
                >
                  商品分类<b className="caret"></b>
                </a>
                <ul className="dropdown-menu multi-column columns-2">
                  <li>
                    <div className="row">
                      <div className="col-sm-12">
                        <h4>商品分类</h4>
                        <ul className="multi-column-dropdown">
                          {typeList &&
                            typeList.map((type) => (
                              <li key={type.id}>
                                <a className="list" href={`goods?typeid=${type.id}`}>
                                  {type.name}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li>
                <a href="top?typeid=2" className={flag === 7 ? 'active' : ''}>
                  热销
                </a>
              </li>
              <li>
                <a href="top?typeid=3" className={flag === 8 ? 'active' : ''}>
                  新品
                </a>
              </li>
              {!user ? (
                <>
                  <li>
                    <a href="register?flag=-1" className={flag === 5 ? 'active' : ''}>
                      注册
                    </a>
                  </li>
                  <li>
                    <a href="login?flag=-1" className={flag === 6 ? 'active' : ''}>
                      登录
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="order" className={flag === 3 ? 'active' : ''}>
                      我的订单
                    </a>
                  </li>
                  <li>
                    <a href="my" className={flag === 4 ? 'active' : ''}>
                      个人中心
                    </a>
                  </li>
                  <li>
                    <a href="logout">退出</a>
                  </li>
                </>
              )}
              <li>
                <a href="../admin.jsp" target="_blank">
                  后台管理
                </a>
              </li>
            </ul>
            {/* /.navbar-collapse */}
          </div>
          {/* //navbar-header */}
        </nav>
        <div className="header-info">
          <div className="header-right search-box">
            <a href="javascript:;">
              <span className="glyphicon glyphicon-search" aria-hidden="true"></span>
            </a>
            <div className="search">
              <form className="navbar-form" action="search">
                <input type="text" className="form-control" name="name" />
                <button type="submit" className="btn btn-default" aria-label="Left Align">
                  搜索
                </button>
              </form>
            </div>
          </div>
          <div className="header-right cart">
            <a href="cart">
              <span className="glyphicon glyphicon-shopping-cart" aria-hidden="true">
                <span className="card_num">{order?.amount || ''}</span>
              </span>
            </a>
          </div>
          <div className="header-right login">
            <a href="my">
              <span className="glyphicon glyphicon-user" aria-hidden="true">
                {user?.username || ''}
              </span>
            </a>
          </div>
          <div className="clearfix"> </div>
        </div>
        <div className="clearfix"> </div>
      </div>
    </div>
  );
};

export default Header;