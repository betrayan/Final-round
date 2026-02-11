import * as pdfjsLib from 'pdfjs-dist';

// Point to the worker file we copied to public folder for Vite compatibility
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

const REQUIRED_SKILLS = [
    { name: 'React', keywords: ['react', 'react.js', 'reactjs'] },
    { name: 'Node.js', keywords: ['node', 'node.js', 'nodejs', 'express'] },
    { name: 'TypeScript', keywords: ['typescript', 'ts'] },
    { name: 'System Design', keywords: ['system design', 'scalability', 'distributed systems', 'microservices'] },
    { name: 'Cloud/AWS', keywords: ['aws', 'amazon web services', 'cloud', 'azure', 'gcp', 'docker', 'kubernetes'] },
    { name: 'Database', keywords: ['sql', 'nosql', 'mongo', 'postgres', 'mysql', 'database'] },
    { name: 'Communication', keywords: ['communication', 'team', 'leadership', 'agile', 'scrum', 'presentation'] }
];

export const analyzeResume = async (file) => {
    try {
        const text = await extractText(file);
        const lowerText = text.toLowerCase();

        const foundSkills = [];
        const missingSkills = [];
        const gapAnalysis = [];

        REQUIRED_SKILLS.forEach(skillGroup => {
            const hasSkill = skillGroup.keywords.some(keyword => lowerText.includes(keyword));

            // Calculate a pseudo-confidence score based on frequency
            const frequency = skillGroup.keywords.reduce((acc, keyword) => {
                return acc + (lowerText.split(keyword).length - 1);
            }, 0);

            // Cap score at 95, min 30 if found
            const score = hasSkill ? Math.min(30 + (frequency * 10), 95) : 10;

            const result = {
                skill: skillGroup.name,
                status: hasSkill ? 'Verified' : 'Gap Detected',
                score: score,
                isGap: !hasSkill
            };

            gapAnalysis.push(result);
            if (hasSkill) foundSkills.push(skillGroup.name);
            else missingSkills.push(skillGroup.name);
        });

        return {
            fileName: file.name,
            textSummary: text.substring(0, 200) + '...',
            gapAnalysis,
            foundSkills,
            missingSkills,
            totalScore: Math.round(gapAnalysis.reduce((acc, curr) => acc + curr.score, 0) / gapAnalysis.length)
        };

    } catch (error) {
        console.error("Analysis Failed", error);
        throw new Error("Could not parse resume.");
    }
};

const extractText = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
    }

    return fullText;
};
