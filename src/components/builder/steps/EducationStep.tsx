'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Education } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function EducationStep() {
  const { state, dispatch } = useResume();

  const addEducation = () => {
    const newEdu: Education = {
      id: generateId(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
    dispatch({ type: 'ADD_EDUCATION', payload: newEdu });
  };

  const updateEdu = (id: string, field: string, value: string) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data: { [field]: value } } });
  };

  const removeEdu = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Education</h3>
          <p className="text-sm text-slate-400">Add your educational background.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={addEducation}>
          <FiPlus /> Add
        </Button>
      </div>

      {state.education.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-500 mb-3">No education added yet</p>
          <Button variant="secondary" size="sm" onClick={addEducation}>
            <FiPlus /> Add Education
          </Button>
        </div>
      )}

      {state.education.map((edu, index) => (
        <div
          key={edu.id}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
              Education {index + 1}
            </span>
            <button
              onClick={() => removeEdu(edu.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Institution"
              placeholder="Stanford University"
              value={edu.institution}
              onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)}
            />
            <Input
              label="Degree"
              placeholder="Bachelor of Science"
              value={edu.degree}
              onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Field of Study"
              placeholder="Computer Science"
              value={edu.field}
              onChange={(e) => updateEdu(edu.id, 'field', e.target.value)}
            />
            <Input
              label="GPA (optional)"
              placeholder="3.8 / 4.0"
              value={edu.gpa}
              onChange={(e) => updateEdu(edu.id, 'gpa', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) => updateEdu(edu.id, 'startDate', e.target.value)}
            />
            <Input
              label="End Date"
              type="month"
              value={edu.endDate}
              onChange={(e) => updateEdu(edu.id, 'endDate', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
