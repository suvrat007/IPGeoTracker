import path from 'path';
import fs from 'fs/promises';

export default async function handler(req, res) {
    const { fileName } = req.query;

    if (!fileName) {
        return res.status(400).json({ error: 'fileName query parameter is required' });
    }

    // Construct the full path to the demo data file
    // process.cwd() is the project root in Vercel.
    // Ensure 'public' is correct if your files are directly inside it.
    const filePath = path.join(process.cwd(), 'public', 'Utils', 'DemoData', fileName);

    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Optional: Basic validation that it's parseable JSON before sending
        // If the file is not JSON, remove this check.
        try {
            JSON.parse(fileContent);
        } catch (parseError) {
            console.error(`Invalid JSON content for ${fileName}:`, parseError);
            return res.status(500).json({ error: `Invalid JSON content in ${fileName}` });
        }

        // Set content type to application/json
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(fileContent); // Send the raw JSON string
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(`File not found: ${filePath}`);
            return res.status(404).json({ error: 'Demo file not found' });
        }
        console.error(`Error serving demo file ${fileName}:`, error);
        res.status(500).json({ error: 'Error reading demo file', details: error.message });
    }
}