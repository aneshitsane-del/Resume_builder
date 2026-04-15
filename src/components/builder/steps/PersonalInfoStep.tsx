'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { FiUploadCloud, FiTrash2, FiPlus, FiCpu } from 'react-icons/fi';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';
import { Certification, Language } from '@/types/resume';
import { generateId } from '@/utils/helpers';

export default function PersonalInfoStep() {
  const { state, dispatch } = useResume();
  const { personalInfo } = state;
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const update = (field: string, value: string) => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: { [field]: value } });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch({ type: 'SET_PERSONAL_INFO', payload: { photoUrl: reader.result as string } });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    dispatch({ type: 'SET_PERSONAL_INFO', payload: { photoUrl: '' } });
  };

  // ─── AI Generation ───
  const generateAISummary = async () => {
    const promptInput = window.prompt('What specific skills, role, or tone should the AI focus on? (e.g. "Software Engineer with 5 years experience in React")');
    if (promptInput === null) return; // Cancelled

    setIsGeneratingAI(true);
    
    // Simulate network latency for AI API
    await new Promise(r => setTimeout(r, 1500));
    
    const role = personalInfo.title || 'Professional';
    const target = promptInput.toLowerCase();
    
    let generated = `Results-driven ${role} with a proven track record of delivering high-quality solutions. `;
    if (target.includes('engineer') || target.includes('developer') || target.includes('react') || target.includes('code')) {
       generated += `Adept at writing scalable, efficient code and collaborating with cross-functional teams to drive product innovation. Extensively experienced in modern frameworks and robust system architecture.`;
    } else if (target.includes('manager') || target.includes('lead') || target.includes('agile')) {
       generated += `Skilled in leading diverse teams to exceed project metrics and optimize operational efficiency. Strategic thinker with strong communication and stakeholder management capabilities.`;
    } else if (target.includes('data') || target.includes('analytics') || target.includes('sql')) {
       generated += `Strong expertise in data modeling, integration, and reporting solutions. Proven ability to automate data workflows and support data-driven decision-making across business teams.`;
    } else {
       generated += `Demonstrated expertise in leveraging industry best practices to achieve business objectives and drive continuous improvement. Passionate about learning and adapting to dynamic environments.`;
    }
    
    update('summary', generated);
    setIsGeneratingAI(false);
  };

  // ─── Certifications ───
  const addCert = () => {
    const newCert: Certification = { id: generateId(), name: '', issuer: '', date: '', link: '' };
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCert });
  };

  const updateCert = (id: string, field: string, value: string) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, data: { [field]: value } } });
  };

  const removeCert = (id: string) => {
    dispatch({ type: 'REMOVE_CERTIFICATION', payload: id });
  };

  // ─── Languages ───
  const addLang = () => {
    const newLang: Language = { id: generateId(), language: '', proficiency: '' };
    dispatch({ type: 'ADD_LANGUAGE', payload: newLang });
  };

  const updateLang = (id: string, field: string, value: string) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: { id, data: { [field]: value } } });
  };

  const removeLang = (id: string) => {
    dispatch({ type: 'REMOVE_LANGUAGE', payload: id });
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">Personal Information</h3>
          <p className="text-sm text-slate-400">Start with the basics — your name, contact details, and a brief summary.</p>
        </div>
        
        {/* Photo Uploader */}
        <div className="flex items-center gap-3 shrink-0">
          {personalInfo.photoUrl ? (
            <div className="relative group">
              <img src={personalInfo.photoUrl} alt="Profile" className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500/50" />
              <button
                onClick={removePhoto}
                className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
              >
                <FiTrash2 size={12} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-16 h-16 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:bg-white/5 hover:border-indigo-400/50 transition-colors">
              <FiUploadCloud className="text-slate-400 mb-1" size={16} />
              <span className="text-[9px] text-slate-400 uppercase font-semibold">Photo</span>
              <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </label>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          value={personalInfo.fullName}
          onChange={(e) => update('fullName', e.target.value)}
        />
        <Input
          label="Job Title"
          placeholder="Senior Software Engineer"
          value={personalInfo.title}
          onChange={(e) => update('title', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          placeholder="john@example.com"
          value={personalInfo.email}
          onChange={(e) => update('email', e.target.value)}
        />
        <Input
          label="Phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          value={personalInfo.phone}
          onChange={(e) => update('phone', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Location"
          placeholder="San Francisco, CA"
          value={personalInfo.location}
          onChange={(e) => update('location', e.target.value)}
        />
        <Input
          label="Total Experience"
          placeholder="e.g. 5 Years 0 Month"
          value={personalInfo.totalExperience || ''}
          onChange={(e) => update('totalExperience', e.target.value)}
        />
      </div>

      <TextArea
        label="Professional Summary"
        placeholder="Briefly describe your professional background, key strengths, and career objectives..."
        value={personalInfo.summary}
        onChange={(e) => update('summary', e.target.value)}
        rows={4}
        rightAction={
          <button
            onClick={generateAISummary}
            disabled={isGeneratingAI}
            className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md transition-all ${
              isGeneratingAI 
                ? 'bg-indigo-500/20 text-indigo-400 cursor-not-allowed animate-pulse' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-purple-500 hover:scale-105 active:scale-95 cursor-pointer'
            }`}
          >
            <FiCpu size={12} />
            {isGeneratingAI ? 'Generating...' : 'AI Generate'}
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="LinkedIn URL"
          placeholder="https://linkedin.com/in/johndoe"
          value={personalInfo.linkedIn}
          onChange={(e) => update('linkedIn', e.target.value)}
        />
        <Input
          label="Website / Portfolio"
          placeholder="https://johndoe.dev"
          value={personalInfo.website}
          onChange={(e) => update('website', e.target.value)}
        />
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Certifications (Moved here per user request) */}
      <div className="space-y-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Certifications</h3>
            <p className="text-sm text-slate-400">Add professional certifications and licenses.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addCert}>
            <FiPlus /> Add
          </Button>
        </div>

        {state.certifications.length === 0 && (
          <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-500 mb-3">No certifications added yet</p>
            <Button variant="secondary" size="sm" onClick={addCert}>
              <FiPlus /> Add Certification
            </Button>
          </div>
        )}

        {state.certifications.map((cert, index) => (
          <div
            key={cert.id}
            className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-4 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                Certification {index + 1}
              </span>
              <button
                onClick={() => removeCert(cert.id)}
                className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Name" placeholder="AWS Solutions Architect" value={cert.name} onChange={(e) => updateCert(cert.id, 'name', e.target.value)} />
              <Input label="Issuer" placeholder="Amazon Web Services" value={cert.issuer} onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Languages (Moved here per user request) */}
      <div className="space-y-5 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Languages</h3>
            <p className="text-sm text-slate-400">List languages you speak and your proficiency.</p>
          </div>
          <Button variant="secondary" size="sm" onClick={addLang}>
            <FiPlus /> Add
          </Button>
        </div>

        {state.languages.length === 0 && (
          <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-500 mb-3">No languages added yet</p>
            <Button variant="secondary" size="sm" onClick={addLang}>
              <FiPlus /> Add Language
            </Button>
          </div>
        )}

        {state.languages.map((lang, index) => (
          <div
            key={lang.id}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl relative group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">
                Language {index + 1}
              </span>
              <button
                onClick={() => removeLang(lang.id)}
                className="text-slate-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Language" placeholder="English" value={lang.language} onChange={(e) => updateLang(lang.id, 'language', e.target.value)} />
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-300">Proficiency</label>
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateLang(lang.id, 'proficiency', e.target.value)}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:border-white/20"
                >
                  <option value="" className="bg-slate-800">Select level</option>
                  <option value="Native" className="bg-slate-800">Native</option>
                  <option value="Fluent" className="bg-slate-800">Fluent</option>
                  <option value="Advanced" className="bg-slate-800">Advanced</option>
                  <option value="Intermediate" className="bg-slate-800">Intermediate</option>
                  <option value="Basic" className="bg-slate-800">Basic</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
