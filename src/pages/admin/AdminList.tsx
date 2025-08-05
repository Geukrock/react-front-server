import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function List() {
    return (
        <div className="container d-flex flex-column gap-3">
            <a href="/admin/products">제품 관리</a>
            <a href="/admin/members">회원 관리</a>
        </div>
    );
}

export default List;