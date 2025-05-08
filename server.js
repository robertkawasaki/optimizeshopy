import express from 'express';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Endpoint to update reviews data
app.post('/api/update-reviews', async (req, res) => {
    try {
        const { content } = req.body;
        const filePath = join(__dirname, 'js', 'reviews-data.js');
        
        await fs.writeFile(filePath, content, 'utf8');
        
        res.json({ success: true, message: 'Reviews data updated successfully' });
    } catch (error) {
        console.error('Error updating reviews:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to update reviews data',
            error: error.message 
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 