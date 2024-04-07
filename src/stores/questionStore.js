import { defineStore } from 'pinia';
import { ref } from 'vue';

export const questionStore = defineStore('questions', () => {
    const questions = ref([]);
    const backendURL = 'http://localhost:8080';

    // Create a new question
    const createQuestion = async (questionDTO) => {
        try {
            const response = await fetch(`${backendURL}/questions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionDTO),
            });
            const newQuestion = await response.json();
            questions.value.push(newQuestion);
            return newQuestion;
        } catch (error) {
            console.error('Error creating question:', error);
        }
    };

    // Update an existing question
    const updateQuestion = async (id, questionDTO) => {
        try {
            await fetch(`${backendURL}/questions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(questionDTO),
            });
            // Update question in local state
            const index = questions.value.findIndex(q => q.id === id);
            if (index !== -1) {
                questions.value[index] = questionDTO;
            }
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    // Delete a question
    const deleteQuestion = async (id) => {
        try {
            await fetch(`${backendURL}/questions/${id}`, {
                method: 'DELETE',
            });
            // Remove question from local state
            questions.value = questions.value.filter(q => q.id !== id);
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return {
        questions,
        createQuestion,
        updateQuestion,
        deleteQuestion,
    };
});
