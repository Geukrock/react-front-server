function List() {
    return (
        <div className="container d-flex flex-column gap-3 text-center">
            <a className="text-xl" href="/admin/products">제품 관리</a>
            <a className="text-xl" href="/admin/members">회원 관리</a>
        </div>
    );
}

export default List;