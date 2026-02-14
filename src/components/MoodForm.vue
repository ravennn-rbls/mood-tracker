<template>
  <div class="mood-form">
    <h2>Mood Check-in</h2>
    <input v-model="name" placeholder="Your name" />
    <textarea v-model="mood" placeholder="How are you feeling today?"></textarea>
    <button @click="submitMood">Submit</button>

    <p v-if="aiMessage" class="ai-response">
      AI Advisor: {{ aiMessage }}
    </p>

    <h3>Mood History</h3>
    <ul>
      <li v-for="m in moods" :key="m.id">
        <strong>{{ m.full_name }}</strong>: {{ m.mood_text }}
        <em>({{ formatDate(m.created_at) }})</em>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api.js';

export default {
  name: 'MoodForm',
  data() {
    return {
      name: '',
      mood: '',
      aiMessage: '',
      moods: []
    };
  },
  methods: {
    async submitMood() {
      try {
        const res = await api.post('/mood', {
          full_name: this.name,
          mood_text: this.mood
        });
        this.aiMessage = res.data.ai_message; // show AI advice
        this.fetchMoods(); // refresh history
        this.mood = ''; // clear input
      } catch (err) {
        console.error(err);
        this.aiMessage = "Server error – please try again later.";
      }
    },
    async fetchMoods() {
      try {
        const res = await api.get('/mood');
        this.moods = res.data;
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(dateString) {
      const d = new Date(dateString);
      return d.toLocaleString();
    }
  },
  mounted() {
    this.fetchMoods(); // load history on page load
  }
};
</script>

<style scoped>
.mood-form {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}
.ai-response {
  margin-top: 1rem;
  font-style: italic;
  color: #2c3e50;
}
ul {
  margin-top: 1rem;
  padding-left: 1rem;
}
li {
  margin-bottom: 0.5rem;
}
</style>
