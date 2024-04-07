import { defineStore } from 'pinia';
import { ref } from 'vue';

export const quizStore = defineStore('quizzes', () => {
    const quizzes = ref([]);
    const quiz = ref({});
    const games = ref([]);
    const backendURL = 'http://localhost:8080';

    // Fetch all quizzes
    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`${backendURL}/quizzes`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            quizzes.value = await response.json();
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    // Fetch a single quiz by ID
    const fetchQuiz = async (quizId) => {
        try {
            const response = await fetch(`${backendURL}/quizzes/${quizId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
