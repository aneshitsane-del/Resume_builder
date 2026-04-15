'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Project } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import TagInput from '@/components/ui/TagInput';
import Button from '@/components/ui/Button';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function ProjectsStep() {
  const { state, dispatch } = useResume();

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
      link: '',
    };
    dispatch({ type: 'ADD_PROJECT', payload: newProject });
  };

  const updateProj = (id: string, field: string, value: string | string[]) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data: { [field]: value } } });
  };

  const removeProj = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  const addTech = (projId: string, tech: string) => {
    const proj = state.projects.find((p) => p.id === projId);
    if (proj && !proj.technologies.includes(tech)) {
      updateProj(projId, 'technologies', [...proj.technologies, tech]);
    }
  };

  const removeTech = (projId: string, index: number) => {
    const proj = state.projects.find((p) => p.id === projId);
    if (proj) {
      updateProj(projId, 'technologies', proj.technologies.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Projects</h3>
          <p className="text-sm text-slate-400">Showcase your best projects and side work.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={addProject}>
          <FiPlus /> Add
        </Button>
      </div>

      {state.projects.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-500 mb-3">No projects added yet</p>
          <Button variant="secondary" size="sm" onClick={addProject}>
            <FiPlus /> Add Project
          </Button>
        </div>
      )}

      {state.projects.map((proj, index) => (
        <div
          key={proj.id}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
              Project {index + 1}
            </span>
            <button
              onClick={() => removeProj(proj.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Project Name"
              placeholder="E-Commerce Platform"
              value={proj.name}
              onChange={(e) => updateProj(proj.id, 'name', e.target.value)}
            />
            <Input
              label="Project Link"
              placeholder="https://github.com/user/project"
              value={proj.link}
              onChange={(e) => updateProj(proj.id, 'link', e.target.value)}
            />
          </div>

          <TextArea
            label="Description"
            placeholder="Describe the project, your role, and key outcomes..."
            value={proj.description}
            onChange={(e) => updateProj(proj.id, 'description', e.target.value)}
            rows={3}
          />

          <TagInput
            label="Technologies Used"
            tags={proj.technologies}
            onAddTag={(tech) => addTech(proj.id, tech)}
            onRemoveTag={(i) => removeTech(proj.id, i)}
            placeholder="Type a technology and press Enter"
          />
        </div>
      ))}
    </div>
  );
}
