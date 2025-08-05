import { useState, useEffect } from 'react';
import { MemberDetail } from 'types/member';
import * as MemberApi from 'api/MemberApi';

function useMember() {
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState<MemberDetail[]>([]);

    const loadMembers = async () => {
        setLoading(true);
        try {
            const data = await MemberApi.fetchMembers();
            setMembers(data);
        } catch (error) {
            console.error("회원 목록 불러오기 오류: " + error);
        } finally {

            setLoading(false);
        }
    };

    const syncMembers = async () => {
        setLoading(true);
        try{
            const data = await MemberApi.syncMembers();
            setMembers(data);
        } catch(error){
            console.error("회원 목록 최신화 오류: " + error);
        } finally{
            setLoading(false);
        }
    };

    return {
        members,
        loading,

        loadMembers,
        syncMembers,
    }
}

export default useMember;