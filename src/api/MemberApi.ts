import axios from 'axios';
import {MemberDetail} from 'types/member';

const apiUrl = process.env.REACT_APP_API_URL;

// 회원 전체 조회
export async function fetchMembers(): Promise<MemberDetail[]> {
    const response = await axios.get<MemberDetail[]>(`${apiUrl}/members/detail`);
    return response.data;
}

export async function syncMembers(): Promise<MemberDetail[]> {
    const response = await axios.post<MemberDetail[]>(`${apiUrl}/members/sync`);
    return response.data;
}