'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ResumeProvider, useResume } from '@/context/ResumeContext';
import ResumeScore from '@/components/ui/ResumeScore';
import ResumeForm from '@/components/builder/ResumeForm';
import ResumePreview from '@/components/preview/ResumePreview';
import Button from '@/components/ui/Button';
import { generatePDF } from '@/utils/pdfGenerator';
import { FiDownload, FiEye, FiEdit3 } from 'react-icons/fi';

const templateOptions = [
  { value: 'modern' as const, label: '✦ Modern' },
  { value: 'professional' as const, label: '✦ Professional' },
  { value: 'minimal' as const, label: '✦ Minimal' },
  { value: 'executive' as const, label: '✦ Executive' },
  { value: 'creative' as const, label: '✦ Creative' },
  { value: 'corporate' as const, label: '✦ Corporate' },
];

const accentColors = [
  '#6366f1', // Indigo
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#f97316', // Orange
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#1e3a5f', // Navy
  '#374151', // Charcoal
];

function BuilderContent() {
  const { state, dispatch } = useResume();
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  const calculateScale = useCallback(() => {
    if (previewContainerRef.current) {
      const containerWidth = previewContainerRef.current.clientWidth - 32; // padding
      const scale = Math.min(containerWidth / 794, 0.75);
      setPreviewScale(scale);
    }
  }, []);

  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [calculateScale]);

  const handleDownload = () => {
    // Temporarily set document title to the user's name so the PDF file saves with their name.
    const originalTitle = document.title;
    const userName = state.personalInfo.fullName?.trim();
    if (userName) {
      document.title = `${userName} - Resume`;
    }
    window.print();
    // Restore original title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 print:hidden">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            R
          </div>
          <span className="font-semibold text-lg hidden sm:inline">ResumeForge</span>
        </a>

        <div className="flex items-center gap-3">
          {/* Template Selector */}
          <select
            value={state.selectedTemplate}
            onChange={(e) => dispatch({ type: 'SET_TEMPLATE', payload: e.target.value as 'modern' | 'professional' | 'minimal' | 'executive' | 'creative' | 'corporate' })}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {templateOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-slate-800">
                {opt.label}
              </option>
            ))}
          </select>

          {/* Color Picker */}
          <div className="hidden md:flex items-center gap-1.5 px-2 py-1.5 bg-white/5 border border-white/10 rounded-xl">
            {accentColors.map((color) => (
              <button
                key={color}
                onClick={() => dispatch({ type: 'SET_ACCENT_COLOR', payload: color })}
                className={`w-5 h-5 rounded-full transition-all duration-200 cursor-pointer ${
                  state.accentColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Mobile View Toggle */}
          <div className="flex md:hidden items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setMobileView('form')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${mobileView === 'form' ? 'bg-indigo-500 text-white' : 'text-slate-400'}`}
            >
              <FiEdit3 size={16} />
            </button>
            <button
              onClick={() => setMobileView('preview')}
              className={`p-2 rounded-lg transition-all cursor-pointer ${mobileView === 'preview' ? 'bg-indigo-500 text-white' : 'text-slate-400'}`}
            >
              <FiEye size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ResumeScore data={state} />
            </div>
            <Button onClick={handleDownload} size="sm">
              <FiDownload />
              <span className="hidden sm:inline">Download</span> PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-64px)] print:h-auto print:block">
        {/* Form Panel */}
        <div
          className={`w-full md:w-[480px] lg:w-[520px] xl:w-[560px] border-r border-white/10 overflow-y-auto p-6 custom-scrollbar shrink-0 print:hidden ${
            mobileView === 'preview' ? 'hidden md:block' : ''
          }`}
        >
          <ResumeForm />
        </div>

        {/* Preview Panel */}
        <div
          ref={previewContainerRef}
          className={`flex-1 overflow-auto bg-slate-900/50 p-4 custom-scrollbar print:p-0 print:bg-white print:overflow-visible ${
            mobileView === 'form' ? 'hidden md:block print:block' : ''
          }`}
        >
          <div
            id="resume-preview-container"
            className="shadow-2xl print:shadow-none print:m-0"
            style={{
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              width: '794px',
            }}
          >
            <table className="w-full border-collapse border-0 border-spacing-0">
              <thead className="hidden print:table-header-group">
                <tr><td className="h-[12mm] p-0 border-0"></td></tr>
              </thead>
              <tbody className="p-0 border-0">
                <tr><td className="p-0 border-0">
                  <div className="print:-mt-[12mm]">
                    <ResumePreview />
                  </div>
                </td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <ResumeProvider>
      <BuilderContent />
    </ResumeProvider>
  );
}
