// store/myApiStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useAuth } from '@/useAuth.js';



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
        const token = await useAuth().refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/games/${username.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token || '',
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
        const token = await useAuth().refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/tags/${username.value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token || '',
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
        const token = await useAuth().refreshTokenIfNeeded();
        const quizPromises = games.value.map(game => fetch(`${backendURL}/quizzes/${game.quizId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token || '',
            },
        }).then(response => response.json()).catch(error => console.error('Error fetching quiz:', error)));

        quizzes.value = await Promise.all(quizPromises);
    };

    /**
     * Creates a game for a user.
     */
    const createGame = async (gameData) => {
        const token = await useAuth().refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/users/${username.value}/games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(gameData),
            });
            if (response.ok) {
                const newGame = await response.json();
                games.value.push(newGame);
            } else {
                console.error('Error creating game');
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    /**
     * Creates a tag for a user.
     */
    const createTag = async (tagData) => {
        const token = await useAuth().refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/users/${username.value}/tags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(tagData),
            });
            if (response.ok) {
                const newTag = await response.json();
                tags.value.push(newTag);
            } else {
                console.error('Error creating tag');
            }
        } catch (error) {
            console.error('Error creating tag:', error);
        }
    };

    /**
     * Updates a tag for a user.
     */
    const updateTag = async (tagData) => {
        const token = await useAuth().refreshTokenIfNeeded();
        try {
            const response = await fetch(`${backendURL}/users/${username.value}/tags`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(tagData),
            });
            if (response.ok) {
                const updatedTag = await response.json();
                const index = tags.value.findIndex(tag => tag.id === updatedTag.id);
                if (index !== -1) {
                    tags.value[index] = updatedTag;
                }
            } else {
                console.error('Error updating tag');
            }
        } catch (error) {
            console.error('Error updating tag:', error);
        }
    };

    return { games, tags, quizzes, username, fetchGames, fetchTags, fetchPlayedQuizzes, createGame, createTag, updateTag };
});
