import useMember from 'hooks/useMember';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function AdminMemberList() {
    const { members, loadMembers, syncMembers } = useMember();
    const [activeTab, setActiveTab] = useState('all'); // 전체(all), 미참석(missed)

    useEffect(() => {
        loadMembers();
    }, []);

    const today = new Date();

    const filteredMembers = activeTab === 'missed'
        ? members.filter(m => {
            const lastJoinDate = m.lastJoinDate ? new Date(m.lastJoinDate) : null;
            const joinDate = m.joinDate ? new Date(m.joinDate) : null;
            // 참석 기록이 있다면 lastJoinDate 기준 한달이 지났는지 확인
            if (lastJoinDate) {
                const diffDays = (today.getTime() - lastJoinDate.getTime()) / (1000 * 60 * 60 * 24);
                return diffDays > 30;
            }

            // 참석 기록이 없다면 가입 일자 기준으로 한달이 지났는지 확인
            if (!lastJoinDate && joinDate) {
                const diffDays = (today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24);
                return diffDays > 30;
            }
        })
        : members.sort((a,b) => b.joinCount - a.joinCount);

    return (
        <>
            <div className="container">

                {/* 탭 버튼 */}
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'all' ? 'active' : ''}`}
                            onClick={() => setActiveTab('all')}
                        >
                            전체
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link ${activeTab === 'missed' ? 'active' : ''}`}
                            onClick={() => setActiveTab('missed')}
                        >
                            1개월 미참석
                        </button>
                    </li>
                </ul>

                <div className='text-center'>
                    <p>매일 23:55분에 갱신됨</p>
                </div>
                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-primary"
                        onClick={syncMembers}
                    >
                        맴버 업데이트
                    </button>
                </div>

                {/* 멤버 리스트 */}
                <div>
                    {filteredMembers.map(member => (
                        <div
                            className="d-flex gap-3 mb-3"
                            key={member.id}
                        >
                            <div style={{ width: '41px', height: '41px' }} className="mt-2">
                                <img
                                    style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                                    src={member.profileUrl.replace('.png', 't.png')}
                                    alt=""
                                />
                            </div>
                            <div className="d-flex flex-column">
                                <span className="text-sm fw-bold">{member.somoimName}</span>
                                <span>
                                    {`출석횟수: ${member.joinCount}`}
                                    {member.joinCount > 0 && member.lastJoinDate != null && ` / 최근 참석: ${member.lastJoinDate}`}
                                </span>
                                <span className="fw-light text-muted">
                                    {member.birthDate + ' / ' + member.joinDate}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AdminMemberList;