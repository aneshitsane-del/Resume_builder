'use client';

import React from 'react';
import { ResumeSection } from '@/types/resume';
import {
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiCode,
  FiFolder,
  FiAward,
} from 'react-icons/fi';

const steps: { key: ResumeSection; label: string; icon: React.ReactNode }[] = [
  { key: 'personalInfo', label: 'Personal', icon: <FiUser /> },
  { key: 'experience', label: 'Experience', icon: <FiBriefcase /> },
  { key: 'education', label: 'Education', icon: <FiBookOpen /> },
  { key: 'skills', label: 'Skills', icon: <FiCode /> },
  { key: 'projects', label: 'Projects', icon: <FiFolder /> },
];

interface StepIndicatorProps {
  currentStep: ResumeSection;
  onStepClick: (step: ResumeSection) => void;
}

export default function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto">
      {steps.map((step) => {
        const isActive = currentStep === step.key;
        return (
          <button
            key={step.key}
            onClick={() => onStepClick(step.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {step.icon}
            <span className="sm:inline">{step.label}</span>
          </button>
        );
      })}
    </div>
  );
}
