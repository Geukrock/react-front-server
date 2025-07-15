import React from 'react';
import { Link } from 'react-router-dom';
import './main-top-bar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <div className="top-bar">
      <Link to="/">
        <img src="/images/logo/main-logo3.png" className="banner-small" alt="메인 로고" />
      </Link>

      <div className="top-btn-container">
        {/* form 태그 대신 Link로 대체 */}
        {/* <Link to="/admin" className="top-text-btn">관리자 페이지</Link> */}
        <Link to="/products" className="top-text-btn">크루티 구매</Link>

        {/* 외부 링크는 버튼 + onClick으로 새창 열기 */}
        {/* <button
          className="top-text-btn"
          onClick={() => window.open('https://docs.google.com/spreadsheets/d/1O0tRuobf80P91Hz_pd3MkhvR1dIzF9Oj8Un0jr3a6Jc/edit?gid=743911786#gid=743911786')}
        >
          회원 관리
        </button> */}

        <button
          className="top-btn"
          onClick={() => window.open('https://open.kakao.com/o/gZrJzuzg')}
        >
          <img className="social-image-middle" src="/images/icon/kakaotalk-logo.png" alt="카카오톡" />
        </button>

        <button
          className="top-btn"
          onClick={() => window.open('https://www.instagram.com/geukrock_crew?igsh=MWgzYXpkaWFjcWxocg%3D%3D&utm_source=qr')}
        >
          <img className="social-image-small" src="/images/icon/instagram-logo.png" alt="인스타그램" />
        </button>

        <button
          className="top-btn"
          onClick={() => window.open('https://www.somoim.co.kr/e6104fa4-3080-11ef-9fe1-0a31a2f27e3f1')}
        >
          <img className="social-image-small" src="/images/icon/somoim-logo.png" alt="소모임" />
        </button>
      </div>
    </div>
  );
}

export default Header;