import { Link } from 'react-router-dom';
import 'components/main.css';
// import './main-top-bar.css';

function Header() {
  return (
    <div className="flex w-full h-[120px] shadow-[0_6px_4px_rgba(0,0,0,0.3)] bg-main-color px-7.5 mb-5 items-center">
      <div className='container flex justify-between'>
        <Link to="/">
          <img src="/images/logo/main-logo3.png" className="w-[90px] md:w-[120px] h-auto" alt="메인 로고" />
        </Link>

        <div className='flex gap-2 md:gap-5 items-center '>
          {/* form 태그 대신 Link로 대체 */}
          <Link to="/products" className="text-white no-underline outline-none bg-transparent text-xl md:text-"
          >크루티 구매</Link>

          <button
            className="top-btn"
            onClick={() => window.open('https://open.kakao.com/o/gZrJzuzg')}
          >
            <img className="h-[50px] md:h-[70px] object-cover" src="/images/icon/kakaotalk-logo.png" alt="카카오톡" />
          </button>

          <button
            className="top-btn"
            onClick={() => window.open('https://www.instagram.com/geukrock_crew?igsh=MWgzYXpkaWFjcWxocg%3D%3D&utm_source=qr')}
          >
            <img className="h-[40px] md:h-[65px] object-cover" src="/images/icon/instagram-logo.png" alt="인스타그램" />
          </button>

          <button
            className="top-btn"
            onClick={() => window.open('https://www.somoim.co.kr/e6104fa4-3080-11ef-9fe1-0a31a2f27e3f1')}
          >
            <img className="h-[40px] md:h-[60px] object-cover" src="/images/icon/somoim-logo.png" alt="소모임" />
          </button>
        </div>
      </div>

    </div>
  );
}

export default Header;