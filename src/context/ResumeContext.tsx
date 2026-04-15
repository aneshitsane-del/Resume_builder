'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { ResumeData, defaultResumeData, Experience, Education, SkillGroup, Project, Certification, Language, PersonalInfo } from '@/types/resume';

// ─── Action Types ────────────────────────────────
type Action =
  | { type: 'SET_PERSONAL_INFO'; payload: Partial<PersonalInfo> }
  | { type: 'SET_TEMPLATE'; payload: ResumeData['selectedTemplate'] }
  | { type: 'SET_ACCENT_COLOR'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_SKILL_GROUP'; payload: SkillGroup }
  | { type: 'UPDATE_SKILL_GROUP'; payload: { id: string; data: Partial<SkillGroup> } }
  | { type: 'REMOVE_SKILL_GROUP'; payload: string }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'UPDATE_CERTIFICATION'; payload: { id: string; data: Partial<Certification> } }
  | { type: 'REMOVE_CERTIFICATION'; payload: string }
  | { type: 'ADD_LANGUAGE'; payload: Language }
  | { type: 'UPDATE_LANGUAGE'; payload: { id: string; data: Partial<Language> } }
  | { type: 'REMOVE_LANGUAGE'; payload: string }
  | { type: 'LOAD_DATA'; payload: ResumeData }
  | { type: 'RESET' };

// ─── Reducer ─────────────────────────────────────
function resumeReducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case 'SET_PERSONAL_INFO':
      return { ...state, personalInfo: { ...state.personalInfo, ...action.payload } };
    case 'SET_TEMPLATE':
      return { ...state, selectedTemplate: action.payload };
    case 'SET_ACCENT_COLOR':
      return { ...state, accentColor: action.payload };

    // Experience
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((e) => e.id !== action.payload) };

    // Education
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((e) =>
          e.id === action.payload.id ? { ...e, ...action.payload.data } : e
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((e) => e.id !== action.payload) };

    // Skills
    case 'ADD_SKILL_GROUP':
      return { ...state, skills: [...state.skills, action.payload] };
    case 'UPDATE_SKILL_GROUP':
      return {
        ...state,
        skills: state.skills.map((s) =>
          s.id === action.payload.id ? { ...s, ...action.payload.data } : s
        ),
      };
    case 'REMOVE_SKILL_GROUP':
      return { ...state, skills: state.skills.filter((s) => s.id !== action.payload) };

    // Projects
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload.data } : p
        ),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) };

    // Certifications
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map((c) =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        ),
      };
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((c) => c.id !== action.payload),
      };

    // Languages
    case 'ADD_LANGUAGE':
      return { ...state, languages: [...state.languages, action.payload] };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map((l) =>
          l.id === action.payload.id ? { ...l, ...action.payload.data } : l
        ),
      };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter((l) => l.id !== action.payload) };

    case 'LOAD_DATA':
      return action.payload;
    case 'RESET':
      return defaultResumeData;

    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────
interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'resume-builder-data';

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, defaultResumeData);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_DATA', payload: { ...defaultResumeData, ...parsed } });
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Auto-save on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  }, [state]);

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
