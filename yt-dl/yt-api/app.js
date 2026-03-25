const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.post('/api/video-info', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: 'URL required' });

        const exePath = path.join(__dirname, 'yt-dlp.exe');

        // Command: yt-dlp --dump-json URL
        const ls = spawn(exePath, ['--dump-json', '--no-playlist', url]);

        let output = '';
        ls.stdout.on('data', (data) => {
            output += data.toString();
        });

        ls.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Failed to fetch video info' });
            }

            try {
                const info = JSON.parse(output);
                res.json({
                    title: info.title,
                    thumbnail: info.thumbnail,
                    duration: info.duration,
                    author: info.uploader,
                    url: info.webpage_url,
                    qualities: ['360p', '480p', '720p', '1080p']
                });
            } catch (e) {
                res.status(500).json({ error: 'JSON parsing error' });
            }
        });

    } catch (error) {
        console.error('Info Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. Download API (Streaming)
app.post('/api/download', (req, res) => {
    const { url, format } = req.body;
    if (!url) return res.status(400).send('URL missing');

    const ext = format === 'audio' ? 'mp3' : 'mp4';
    res.setHeader('Content-Disposition', `attachment; filename="download.${ext}"`);

    // Yahan hum local .exe ka path de rahe hain
    const exePath = path.join(__dirname, 'yt-dlp.exe');

    const args = [
        url,
        '-f', format === 'audio' ? 'bestaudio/best' : 'best',
        '-o', '-', 
        '--no-playlist'
    ];

    const ytProcess = spawn(exePath, args);

    ytProcess.stdout.pipe(res);

    ytProcess.stderr.on('data', (data) => console.log(`Dlp Logs: ${data}`));

    ytProcess.on('error', (err) => {
        console.error('Failed to start yt-dlp:', err);
        if (!res.headersSent) res.status(500).send('Server Error');
    });
});

app.listen(8080, () => console.log(`✅ Server: http://localhost:8080`));




