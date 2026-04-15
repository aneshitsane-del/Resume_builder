'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Experience } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { FiPlus, FiTrash2, FiCpu } from 'react-icons/fi';

export default function ExperienceStep() {
  const { state, dispatch } = useResume();
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const generateAIDescription = async (expId: string, company: string, position: string) => {
    const promptInput = window.prompt(`What achievements or specific skills should the AI highlight for your role at ${company || 'this company'}?`);
    if (promptInput === null) return;

    setGeneratingId(expId);
    await new Promise(r => setTimeout(r, 1500));

    const role = position || 'professional';
    const target = promptInput.toLowerCase();

    let generated = `Spearheaded key initiatives as a ${role} at ${company || 'the company'}. `;
    if (target.includes('lead') || target.includes('manage')) {
      generated += `Successfully managed cross-functional teams to deliver projects on time and under budget. Improved overall team velocity and streamlined communication channels across stakeholders.`;
    } else if (target.includes('develop') || target.includes('code') || target.includes('software')) {
      generated += `Designed, developed, and maintained robust technical solutions. Optimized existing architecture to improve system performance and significantly reduce technical debt.`;
    } else if (target.includes('sales') || target.includes('revenue')) {
      generated += `Exceeded performance targets and drove significant revenue growth. Built and nurtured strong client relationships to ensure long-term retention and satisfaction.`;
    } else {
      generated += `Consistently delivered high-quality results by leveraging strong analytical and problem-solving skills. Collaborated closely with internal stakeholders to align deliverables with core business objectives.`;
    }

    updateExp(expId, 'description', generated);
    setGeneratingId(null);
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: generateId(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      highlights: [],
    };
    dispatch({ type: 'ADD_EXPERIENCE', payload: newExp });
  };

  const updateExp = (id: string, field: string, value: string | boolean) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data: { [field]: value } } });
  };

  const removeExp = (id: string) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Work Experience</h3>
          <p className="text-sm text-slate-400">Add your relevant work history, starting with the most recent.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={addExperience}>
          <FiPlus /> Add
        </Button>
      </div>

      {state.experience.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-500 mb-3">No experience added yet</p>
          <Button variant="secondary" size="sm" onClick={addExperience}>
            <FiPlus /> Add Experience
          </Button>
        </div>
      )}

      {state.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
              Position {index + 1}
            </span>
            <button
              onClick={() => removeExp(exp.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Company"
              placeholder="Google"
              value={exp.company}
              onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
            />
            <Input
              label="Position"
              placeholder="Software Engineer"
              value={exp.position}
              onChange={(e) => updateExp(exp.id, 'position', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)}
            />
            <div>
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
              />
              <label className="flex items-center gap-2 mt-2 text-sm text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) => updateExp(exp.id, 'current', e.target.checked)}
                  className="accent-indigo-500"
                />
                Currently working here
              </label>
            </div>
          </div>

          <TextArea
            label="Description"
            placeholder="Describe your responsibilities and achievements..."
            value={exp.description}
            onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
            rows={3}
            rightAction={
              <button
                onClick={() => generateAIDescription(exp.id, exp.company, exp.position)}
                disabled={generatingId === exp.id}
                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md transition-all ${
                  generatingId === exp.id 
                    ? 'bg-indigo-500/20 text-indigo-400 cursor-not-allowed animate-pulse' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 cursor-pointer'
                }`}
              >
                <FiCpu size={12} />
                {generatingId === exp.id ? 'Generating...' : 'AI Generate'}
              </button>
            }
          />
        </div>
      ))}
    </div>
  );
}
