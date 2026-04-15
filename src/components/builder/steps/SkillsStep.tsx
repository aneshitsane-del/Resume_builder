'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { SkillGroup } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import TagInput from '@/components/ui/TagInput';
import Button from '@/components/ui/Button';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function SkillsStep() {
  const { state, dispatch } = useResume();

  const addSkillGroup = () => {
    const newGroup: SkillGroup = {
      id: generateId(),
      category: '',
      items: [],
    };
    dispatch({ type: 'ADD_SKILL_GROUP', payload: newGroup });
  };

  const updateGroup = (id: string, field: string, value: string | string[]) => {
    dispatch({ type: 'UPDATE_SKILL_GROUP', payload: { id, data: { [field]: value } } });
  };

  const removeGroup = (id: string) => {
    dispatch({ type: 'REMOVE_SKILL_GROUP', payload: id });
  };

  const addSkillToGroup = (groupId: string, skill: string) => {
    const group = state.skills.find((g) => g.id === groupId);
    if (group && !group.items.includes(skill)) {
      updateGroup(groupId, 'items', [...group.items, skill]);
    }
  };

  const removeSkillFromGroup = (groupId: string, index: number) => {
    const group = state.skills.find((g) => g.id === groupId);
    if (group) {
      const newItems = group.items.filter((_, i) => i !== index);
      updateGroup(groupId, 'items', newItems);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Skills</h3>
          <p className="text-sm text-slate-400">
            Group your skills by category (e.g., Frontend, Backend, Tools).
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={addSkillGroup}>
          <FiPlus /> Add Group
        </Button>
      </div>

      {state.skills.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
          <p className="text-slate-500 mb-3">No skill groups added yet</p>
          <Button variant="secondary" size="sm" onClick={addSkillGroup}>
            <FiPlus /> Add Skill Group
          </Button>
        </div>
      )}

      {state.skills.map((group, index) => (
        <div
          key={group.id}
          className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
              Group {index + 1}
            </span>
            <button
              onClick={() => removeGroup(group.id)}
              className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
            >
              <FiTrash2 size={16} />
            </button>
          </div>

          <Input
            label="Category Name"
            placeholder="e.g., Frontend, Backend, DevOps"
            value={group.category}
            onChange={(e) => updateGroup(group.id, 'category', e.target.value)}
          />

          <TagInput
            label="Skills"
            tags={group.items}
            onAddTag={(tag) => addSkillToGroup(group.id, tag)}
            onRemoveTag={(i) => removeSkillFromGroup(group.id, i)}
            placeholder="Type a skill and press Enter"
          />
        </div>
      ))}
    </div>
  );
}
