// pages/api/getDemoData.js

import path from 'path';
import fs from 'fs'; // Use 'fs' for createReadStream, not 'fs/promises'
import JSONStream from 'jsonstream'; // Import the streaming JSON parser

export default async function handler(req, res) {
    const { fileName } = req.query;

    if (!fileName) {
        return res.status(400).json({ error: 'fileName query parameter is required' });
    }

    // Determine the correct file path.
    // This assumes your large JSON files are in 'public/Utils/DemoData/'
    // If you moved them to 'data/DemoData/', change 'public' to 'data'.
    const filePath = path.join(process.cwd(), 'public', 'Utils', 'DemoData', fileName);

    try {
        // Check if the file exists first
        await fs.promises.access(filePath, fs.constants.F_OK);

        // Create a readable stream from the file
        const fileStream = fs.createReadStream(filePath, { encoding: 'utf8' });

        let parsedItems = []; // Array to collect the parsed JSON objects

        // Use JSONStream to parse the file incrementally.
        // The '*' selector assumes your JSON is an array of objects at the root,
        // like [ { ... }, { ... }, ... ]
        const parser = JSONStream.parse('*');

        fileStream
            .pipe(parser)
            .on('data', (item) => {
                // 'item' is each individual JSON object (e.g., a packet object)
                parsedItems.push(item);

                // --- IMPORTANT CONSIDERATION FOR VERY LARGE FILES ---
                // If the entire 'parsedItems' array (after parsing 100-200MB)
                // exceeds Vercel's 4.5MB response limit, or consumes too much
                // memory on the serverless function *before* sending the response,
                // you would need to implement pagination here.
                // For now, we're collecting all of it.
            })
            .on('end', () => {
                // All data has been parsed and collected
                try {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(parsedItems); // Send the collected data as a JSON array
                } catch (sendError) {
                    console.error(`Error sending JSON response for ${fileName}:`, sendError);
                    res.status(500).json({ error: 'Error sending JSON response', details: sendError.message });
                }
            })
            .on('error', (streamError) => {
                // Catch errors during streaming or parsing (e.g., malformed JSON mid-file)
                console.error(`Error streaming or parsing ${fileName}:`, streamError);
                res.status(500).json({ error: `Error streaming or parsing JSON from ${fileName}`, details: streamError.message });
            });

        // Handle errors that occur on the file stream itself (e.g., file not found early)
        fileStream.on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.error(`File not found: ${filePath}`);
                // Only send error if response hasn't already started
                if (!res.headersSent) {
                    return res.status(404).json({ error: 'Demo file not found' });
                }
            } else {
                console.error(`File stream error for ${fileName}:`, err);
                if (!res.headersSent) {
                    res.status(500).json({ error: 'File stream error', details: err.message });
                }
            }
        });

    } catch (error) {
        // Catch errors if fs.promises.access fails (e.g., file not found initially)
        if (error.code === 'ENOENT') {
            console.error(`File not found: ${filePath}`);
            return res.status(404).json({ error: 'Demo file not found' });
        }
        console.error(`Unexpected server error for ${fileName}:`, error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}