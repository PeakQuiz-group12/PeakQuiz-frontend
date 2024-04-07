// quizStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuth } from '@/useAuth.js';

export const useQuizStore = defineStore('quizzes', () => {
    const quizzes = ref([]);
    const quiz = ref({});
    const games = ref([]);
    const backendURL = 'http://localhost:8080';

    // Make sure refreshTokenIfNeeded is called inside each method needing it
    async function fetchQuizzes() {
        const { refreshTokenIfNeeded } = useAuth();
        const token = await refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/quizzes?size=50`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            quizzes.value = await response.json();
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    }

    // Fetch a single quiz by ID
    const fetchQuiz = async (quizId) => {
        const { refreshTokenIfNeeded } = useAuth();
        const token = await refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/quizzes/${quizId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            quiz.value = await response.json();
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    // Create a new quiz
    const createQuiz = async (quizCreateDTO) => {
        try {
            const response = await fetch(`${backendURL}/quizzes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizCreateDTO),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    // Update an existing quiz
    const updateQuiz = async (quizId, quizData) => {
        try {
            const response = await fetch(`${backendURL}/quizzes/${quizId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(quizData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating quiz:', error);
        }
    };

    // Delete a quiz
    const deleteQuiz = async (quizId) => {
        try {
            await fetch(`${backendURL}/quizzes/${quizId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    // Fetch games associated with a quiz
    const fetchGamesForQuiz = async (quizId) => {
        try {
            const response = await fetch(`${backendURL}/quizzes/games/${quizId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            games.value = await response.json();
        } catch (error) {
            console.error('Error fetching games for quiz:', error);
        }
    };

    return {
        quizzes,
        quiz,
        games,
        fetchQuizzes,
        fetchQuiz,
        createQuiz,
        updateQuiz,
        deleteQuiz,
        fetchGamesForQuiz
    };
});
