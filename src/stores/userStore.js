// store/myApiStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const userStore = defineStore('user', () => {
    const games = ref([]);
    const tags = ref([]);
    const quizzes = ref([]);
    const username = ref(sessionStorage.getItem('username'));
    const backendURL = 'http://localhost:8080';


    /**
     * Fetches a user's games from the backend.
     */
    const fetchGames = async () => {
        try {
            const response = await fetch(`${backendURL}/games/${username.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            games.value = await response.json();
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    /**
     * Fetches a user's tags from the backend.
     */
    const fetchTags = async () => {
        try {
            const response = await fetch(`${backendURL}/tags/${username.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            tags.value = await response.json();
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    /**
     * Fetches the quizzes that a user has played.
     */
    const fetchPlayedQuizzes = async (games) => {
        const quizPromises = games.value.map(game => fetch(`${backendURL}/quizzes/${game.quizId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json()).catch(error => console.error('Error fetching quiz:', error)));

        quizzes.value = await Promise.all(quizPromises);
    };

    return { games, tags, quizzes, username, fetchGames, fetchTags, fetchPlayedQuizzes };
});
