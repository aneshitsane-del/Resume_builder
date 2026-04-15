'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import CorporateTemplate from '@/components/templates/CorporateTemplate';

const templates = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  corporate: CorporateTemplate,
};

export default function ResumePreview() {
  const { state } = useResume();
  const Template = templates[state.selectedTemplate];

  return (
    <div
      id="resume-preview"
      className="origin-top-left"
      style={{
        backgroundColor: '#ffffff',
        width: '794px',
        minHeight: '1123px', // A4 ratio
      }}
    >
      <Template data={state} />
    </div>
  );
}
