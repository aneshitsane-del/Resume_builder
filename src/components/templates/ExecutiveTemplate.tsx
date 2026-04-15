import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGlobe,
} from 'react-icons/fi';

interface TemplateProps {
  data: ResumeData;
}

export default function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#1f2937';

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#111827', fontFamily: "'Palatino', 'Book Antiqua', serif" }}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start border-b-[3px] border-double px-10 py-8" style={{ borderColor: accent }}>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-4xl font-bold uppercase tracking-wide" style={{ color: accent }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p className="text-xl mt-2 font-medium tracking-widest text-slate-600 uppercase">{personalInfo.title}</p>
          )}
          
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-xs font-semibold uppercase tracking-widest text-[#4b5563]">
            {personalInfo.email && <span className="flex items-center gap-1.5"><FiMail size={12} style={{ color: accent }} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><FiPhone size={12} style={{ color: accent }} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><FiMapPin size={12} style={{ color: accent }} /> {personalInfo.location}</span>}
            {personalInfo.totalExperience && <span className="flex items-center gap-1.5 whitespace-nowrap"><span style={{ color: accent }}>EXP:</span> {personalInfo.totalExperience}</span>}
            {personalInfo.linkedIn && <span className="flex items-center gap-1.5"><FiLinkedin size={12} style={{ color: accent }} /> LinkedIn</span>}
            {personalInfo.website && <span className="flex items-center gap-1.5"><FiGlobe size={12} style={{ color: accent }} /> Portfolio</span>}
          </div>
        </div>

        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className="w-28 h-32 object-cover border-2 shadow-sm shrink-0 ml-0 sm:ml-8 mt-6 sm:mt-0" 
            style={{ borderColor: accent }}
          />
        )}
      </div>

      <div className="px-10 py-6">
        {personalInfo.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-3 pb-1 border-b" style={{ borderColor: `${accent}40`, color: accent }}>
              Executive Summary
            </h2>
            <p className="text-[14px] leading-relaxed" style={{ color: '#374151', fontFamily: "'Georgia', serif" }}>
              {personalInfo.summary}
            </p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b" style={{ borderColor: `${accent}40`, color: accent }}>
              Professional Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold" style={{ color: '#111827' }}>{exp.position}</h3>
                    <span className="text-sm font-sans font-medium" style={{ color: accent }}>
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-sm italic font-serif mb-2" style={{ color: '#4b5563' }}>{exp.company}</p>
                  {exp.description && (
                    <p className="text-[13px] leading-relaxed font-serif" style={{ color: '#374151' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {education.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b" style={{ borderColor: `${accent}40`, color: accent }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-[14px]">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                    <p className="text-sm italic text-slate-600">{edu.institution}</p>
                    <p className="text-xs font-sans mt-0.5 text-slate-500">
                       {formatDate(edu.startDate)} — {formatDate(edu.endDate)} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b" style={{ borderColor: `${accent}40`, color: accent }}>
                Core Competencies
              </h2>
              <div className="space-y-2">
                {skills.map((group) => (
                  <div key={group.id} className="text-sm font-sans">
                    {group.category && <span className="font-bold mr-2 text-slate-800">{group.category}:</span>}
                    <span className="text-slate-600 leading-relaxed">{group.items.join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 pb-1 border-b" style={{ borderColor: `${accent}40`, color: accent }}>
              Key Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="font-sans">
                  <h3 className="font-bold text-sm text-slate-800">{proj.name}</h3>
                  <p className="text-xs mt-1 text-slate-600 leading-relaxed">{proj.description}</p>
                  {proj.technologies.length > 0 && (
                    <p className="text-[11px] mt-2 font-medium text-slate-500 uppercase tracking-widest">
                      {proj.technologies.join(' • ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
