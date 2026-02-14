const express = require('express');
const router = express.Router();
const pool = require('../db'); // import your db.js connection

// POST – Create Mood
router.post('/', async (req, res) => {
  const { full_name, mood_text } = req.body;

  try {
    // Save to DB
    const [result] = await pool.query(
      'INSERT INTO moods (full_name, mood_text) VALUES (?, ?)',
      [full_name, mood_text]
    );

    // AI Advisor logic
    let ai_message;
    const moodLower = mood_text.toLowerCase();
    if (moodLower.includes('sad')) {
      ai_message = `I'm sorry you're feeling down, ${full_name}. Remember, it's okay to have tough days.`;
    } else if (moodLower.includes('happy')) {
      ai_message = `That's wonderful, ${full_name}! Keep embracing the positivity.`;
    } else if (moodLower.includes('tired')) {
      ai_message = `Rest is important, ${full_name}. Make sure to take care of yourself.`;
    } else if (moodLower.includes('anxious')) {
      ai_message = `It sounds like you're feeling anxious, ${full_name}. Deep breaths and grounding can help.`;
    } else if (moodLower.includes('stressed')) {
      ai_message = `Stress can be overwhelming, ${full_name}. Try to take a short break or breathe deeply.`;
    } else {
      ai_message = `Thanks for sharing, ${full_name}. I'm here to listen.`;
    }

    res.status(201).json({
      message: 'Mood created successfully',
      mood: { id: result.insertId, full_name, mood_text },
      ai_message
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// GET – Read Moods
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM moods ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
