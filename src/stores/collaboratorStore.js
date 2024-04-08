import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuth } from '@/useAuth.js'

export const useCollaboratorStore = defineStore('collaborators', () => {
    const collaborators = ref([]);
    const userQuizzes = ref([]);
    const backendURL = 'http://localhost:8080';

    // Create a new collaboration
    const createCollaboration = async (userId, quizId, collaborationType) => {
        try {
            const response = await fetch(`${backendURL}/collaborations`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, quizId, collaborationType }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating collaboration:', error);
        }
    };

    // Fetch collaborators for a quiz
    const fetchCollaborators = async (quizId, page = 0, size = 5, sort = 'username:asc') => {
        try {
            const response = await fetch(`${backendURL}/collaborations/user?quizId=${quizId}&page=${page}&size=${size}&sort=${sort}`, {
                method: 'GET',
            });
            collaborators.value = (await response.json()).content; // Assuming the response has a 'content' field
        } catch (error) {
            console.error('Error fetching collaborators:', error);
        }
    };

    const fetchUserQuizzes = async (collaboratorString) => {
        const { refreshTokenIfNeeded } = useAuth();
        const token = await refreshTokenIfNeeded();

        try {
            const response = await fetch(`${backendURL}/users/me/quizzes?collaboratorType=` + collaboratorString, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            userQuizzes.value = (await response.json());
        } catch (error) {
            console.error('Error fetching user quizzes:', error);
        }
    };

    return {
        collaborators,
        userQuizzes,
        createCollaboration,
        fetchCollaborators,
        fetchUserQuizzes
    };
});
