import { ResumeData } from '@/types/resume';

export interface ScoreCategory {
  id: string;
  label: string;
  maxScore: number;
  actualScore: number;
  suggestion: string;
}

export interface ScoreResult {
  totalScore: number;
  breakdown: ScoreCategory[];
}

const ACTION_VERBS = [
  'managed', 'led', 'developed', 'designed', 'increased', 'decreased', 
  'spearheaded', 'coordinated', 'achieved', 'created', 'implemented', 
  'optimized', 'resolved', 'improved', 'orchestrated'
];

export function calculateScore(data: ResumeData): ScoreResult {
  const breakdown: ScoreCategory[] = [];
  let totalScore = 0;

  // 1. Contact Information (Max 20)
  let contactScore = 0;
  if (data.personalInfo.email) contactScore += 5;
  if (data.personalInfo.phone) contactScore += 5;
  if (data.personalInfo.location) contactScore += 5;
  if (data.personalInfo.linkedIn) contactScore += 5;
  
  breakdown.push({
    id: 'contact',
    label: 'Contact Completeness',
    maxScore: 20,
    actualScore: contactScore,
    suggestion: contactScore < 20 ? 'Add Email, Phone, Location, and LinkedIn to maximize visibility.' : 'Great job! Your contact info is complete.',
  });
  totalScore += contactScore;

  // 2. Professional Summary (Max 15)
  let summaryScore = 0;
  let summarySuggestion = 'Add a professional summary highlighting your career objectives.';
  if (data.personalInfo.summary && data.personalInfo.summary.trim().length > 0) {
    summaryScore += 5;
    const wordCount = data.personalInfo.summary.trim().split(/\s+/).length;
    if (wordCount >= 30) {
      summaryScore += 10;
      summarySuggestion = 'Your professional summary is a great length and highly detailed.';
    } else {
      summaryScore += 5;
      summarySuggestion = 'Expand your summary to at least 30 words for better ATS ranking.';
    }
  }
  breakdown.push({
    id: 'summary',
    label: 'Professional Summary',
    maxScore: 15,
    actualScore: summaryScore,
    suggestion: summarySuggestion,
  });
  totalScore += summaryScore;

  // 3. Work Experience Quantity (Max 20)
  let expQuanScore = 0;
  if (data.experience.length >= 2) expQuanScore = 20;
  else if (data.experience.length === 1) expQuanScore = 10;
  
  breakdown.push({
    id: 'exp_quantity',
    label: 'Experience History',
    maxScore: 20,
    actualScore: expQuanScore,
    suggestion: expQuanScore < 20 ? 'Aim for at least 2 relevant job experiences if possible.' : 'Strong experience history recorded.',
  });
  totalScore += expQuanScore;

  // 4. Experience Quality (Max 20)
  let expQualScore = 0;
  let hasMetrics = false;
  let hasVerbs = false;

  const allExpText = data.experience.map(e => (e.description + ' ' + e.position).toLowerCase()).join(' ');
  const projectsText = data.projects.map(p => (p.description + ' ' + p.name).toLowerCase()).join(' ');
  const fullText = allExpText + ' ' + projectsText;

  // Check for numbers and percentages (Metrics)
  if (/\d+/.test(fullText) || /[$€£]/.test(fullText) || /%/.test(fullText)) {
    hasMetrics = true;
    expQualScore += 10;
  }
  
  // Check for Action Verbs
  for (const verb of ACTION_VERBS) {
    if (fullText.includes(verb)) {
      hasVerbs = true;
      expQualScore += 10;
      break;
    }
  }

  let qualSuggestion = 'Excellent use of action verbs and quantifiable metrics! highly impactful.';
  if (!hasMetrics && !hasVerbs) {
    qualSuggestion = 'Use strong action verbs (e.g. "Managed", "Developed") and quantifiable metrics (e.g. "Increased by 20%").';
  } else if (!hasMetrics) {
    qualSuggestion = 'Add numbers or percentages ("$10k", "20%") to prove your impact.';
  } else if (!hasVerbs) {
    qualSuggestion = 'Start your sentences with strong action verbs like "Spearheaded" or "Optimized".';
  }

  breakdown.push({
    id: 'exp_quality',
    label: 'Impact & Verbs',
    maxScore: 20,
    actualScore: expQualScore,
    suggestion: qualSuggestion,
  });
  totalScore += expQualScore;

  // 5. Education (Max 10)
  let eduScore = data.education.length > 0 ? 10 : 0;
  breakdown.push({
    id: 'education',
    label: 'Education',
    maxScore: 10,
    actualScore: eduScore,
    suggestion: eduScore === 0 ? 'Include at least one education or degree block.' : 'Education is properly documented.',
  });
  totalScore += eduScore;

  // 6. Skills (Max 15)
  const totalSkills = data.skills.reduce((acc, curr) => acc + curr.items.length, 0);
  let skillScore = 0;
  if (totalSkills >= 8) skillScore = 15;
  else if (totalSkills > 0) skillScore = 10;
  
  breakdown.push({
    id: 'skills',
    label: 'Key Skills',
    maxScore: 15,
    actualScore: skillScore,
    suggestion: totalSkills < 8 ? `You only have ${totalSkills} skills. Aim for 8+ to pass keyword scanners.` : 'Solid list of keyword skills for ATS.',
  });
  totalScore += skillScore;

  return {
    totalScore,
    breakdown
  };
}
