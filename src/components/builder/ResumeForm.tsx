'use client';

import React, { useState } from 'react';
import { ResumeSection } from '@/types/resume';
import StepIndicator from '@/components/ui/StepIndicator';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ExperienceStep from './steps/ExperienceStep';
import EducationStep from './steps/EducationStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsStep from './steps/ProjectsStep';

const stepComponents: Record<ResumeSection, React.FC> = {
  personalInfo: PersonalInfoStep,
  experience: ExperienceStep,
  education: EducationStep,
  skills: SkillsStep,
  projects: ProjectsStep,
};

export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState<ResumeSection>('personalInfo');
  const StepComponent = stepComponents[currentStep];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <StepIndicator currentStep={currentStep} onStepClick={setCurrentStep} />
      </div>
      <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
        <StepComponent />
      </div>
    </div>
  );
}
