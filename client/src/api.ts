import axios from 'axios';
import { SeniorInterface, UserInterface, VisitInterface } from './models/interfaces';
 
const api = axios.create({
    baseURL: import.meta.env.VITE_BACK_END,
});

export const registerUser = async (userData: UserInterface) => {
    try {
        const response = await api.post('/register', userData);
        return response.data;
    } catch (error) {
        console.error('api: Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (mobile: string) => {
    const userData = ({ "mobile": mobile })
    try {
        const response = await api.post('/login', userData);
        return response.data;
    } catch (error) {
        console.error('api: Error logging in:', error);
        throw error;
    }
};

export const checkEmailExists = async (email: string): Promise<boolean> => {
    try {
        await api.get(`/email?email=${email}`);
        return true;
    } catch (error) {
        console.error('api: Non-existent email:', error);
        return false;
    }
};

export const checkMobileExists = async (mobile: string): Promise<boolean> => {
    try {
        await api.get(`/mobile?mobile=${mobile}`);
        return true;
    } catch (error) {
        console.error('api: Non-existent mobile:', error);
        return false;
    }
};

export const getAllUsersData = async () => {
    try {
        const response = await api.get(`/users`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getUserByIdData = async (userId: string) => {
    try {
        const response = await api.get(`/user?id=${userId}` );
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getAllSeniorsData = async () => {
    try {
        const response = await api.get('/seniors');
        return response.data;
    } catch (error) {
        console.error('Error fetching seniors:', error);
        throw error;
    }
};

export const getSeniorByIdData = async (seniorId: number): Promise<SeniorInterface> => {
    try {
        const response = await api.get(`/senior?id=${seniorId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching senior with ID ${seniorId}:`, error);
        throw error;
    }
};

type PartialSenior = Partial<SeniorInterface>;
export const updateSenior = async (seniorData: PartialSenior) => {
    try {
        const response = await api.patch('/update_senior', seniorData);
        return response.data;
    } catch (error) {
        console.error('Error updating senior:', error);
        throw error;
    }
};

export const getAllVisitsData = async () => {
    try {
        const response = await api.get('/visits');
        return response.data;
    } catch (error) {
        console.error('Error fetching visits:', error);
        throw error;
    }
};

export const getVisitByIdData = async (visitId: number) => {
    try {
        const response = await api.get(`/visit?id=${visitId}` );
        return response.data;
    } catch (error) {
        console.error(`Error fetching visit with ID ${visitId}:`, error);
        throw error;
    }
};

export const getUserVisitData = async (user_id: number) => {
    try {
        const response = await api.get(`/user_visits?id=${user_id}` );
        return response.data;
    } catch (error) {
        console.error(`Error fetching visits for user ${user_id}:`, error);
        throw error;
    }
};

export const getLatestVisitId = async () => {
    try {
        const response = await api.get('/visit_id');
        return response.data;
    } catch (error) {
        console.error('Error generating visit ID:', error);
        throw error;
    }
};

export const createVisit = async (visitData: VisitInterface) => {
    try {
        const response = await api.post('/create_visit', visitData);
        return response.data;
    } catch (error) {
        console.error('Error creating visit:', error);
        throw error;
    }
};

type PartialVisit = Partial<VisitInterface>;
export const updateVisit = async (visitData: PartialVisit) => {
    try {
        const response = await api.patch('/update_visit', visitData);
        return response.data;
    } catch (error) {
        console.error('Error updating visit:', error);
        throw error;
    }
};

export const getDaysLastVisted = async (senior_id: string) => {
    try {
        const response = await api.get(`/days?id=${senior_id}`);
        return response.data;
    } catch (error) {
        console.error('Error getting days:', error);
        throw error;
    }
};

export const displayDaysLastVisited = (days: number | string) => {
    if (days === "NEVER VISITED") {
        return days;
    } else if (days === 0) {
        return 'Today';
    } else if (days === 1) {
        return 'Yesterday';
    } else {
        return `${String(days)} days ago`;
    }
};