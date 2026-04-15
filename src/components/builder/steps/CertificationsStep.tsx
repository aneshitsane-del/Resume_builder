'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Certification, Language } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CertificationsStep() {
  const { state, dispatch } = useResume();

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
    <div className="space-y-8 animate-fadeIn">
      {/* Certifications */}
      <div className="space-y-5">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Date" type="month" value={cert.date} onChange={(e) => updateCert(cert.id, 'date', e.target.value)} />
              <Input label="Link (optional)" placeholder="https://credential.url" value={cert.link} onChange={(e) => updateCert(cert.id, 'link', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Languages */}
      <div className="space-y-5">
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
