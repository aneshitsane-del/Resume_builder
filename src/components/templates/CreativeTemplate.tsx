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

export default function CreativeTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#14b8a6'; // Teal default for creative

  return (
    <div className="font-sans" style={{ backgroundColor: '#ffffff', color: '#111827', fontFamily: "'Outfit', 'Helvetica Neue', sans-serif" }}>
      
      {/* Top Banner & Photo Area */}
      <div className="relative pt-24 px-10 pb-8 text-center" style={{ backgroundColor: '#f8fafc' }}>
        <div className="absolute top-0 left-0 w-full h-24" style={{ backgroundColor: accent }} />
        
        <div className="relative z-10 flex flex-col items-center">
          {personalInfo.photoUrl && (
            <img 
              src={personalInfo.photoUrl} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 shadow-xl mb-4 bg-white" 
              style={{ borderColor: '#ffffff', marginTop: '-64px' }}
            />
          )}
          
          <h1 className="text-4xl font-black uppercase tracking-widest text-slate-800 mt-2">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p className="text-sm font-bold tracking-[0.2em] uppercase mt-2 mb-4" style={{ color: accent }}>
              {personalInfo.title}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-3 gap-y-2 text-xs font-semibold text-slate-500 max-w-2xl">
            {personalInfo.email && <span className="flex items-center gap-1.5"><FiMail size={12} style={{ color: accent }} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><FiPhone size={12} style={{ color: accent }} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><FiMapPin size={12} style={{ color: accent }} /> {personalInfo.location}</span>}
            {personalInfo.totalExperience && <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="uppercase tracking-widest text-[10px]" style={{ color: accent }}>EXP</span>{personalInfo.totalExperience}</span>}
            {personalInfo.linkedIn && <span className="flex items-center gap-1.5"><FiLinkedin size={12} style={{ color: accent }} /> LinkedIn</span>}
            {personalInfo.website && <span className="flex items-center gap-1.5"><FiGlobe size={12} style={{ color: accent }} /> Portfolio</span>}
          </div>
        </div>
      </div>

      {/* Summary Section (Full Width) */}
      {personalInfo.summary && (
        <div className="px-12 py-10 border-b border-slate-100">
          <p className="text-center text-[14px] leading-relaxed font-medium text-slate-600 max-w-3xl mx-auto">
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Main Content Area */}
      <div className="px-12 py-10">
        
        {/* Skills - Grid Layout at Top */}
        {skills.length > 0 && (
          <div className="mb-12">
            <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-[2px]" style={{ backgroundColor: accent }} />
              Expertise
              <span className="w-8 h-[2px]" style={{ backgroundColor: accent }} />
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {skills.map((group) => (
                <React.Fragment key={group.id}>
                  {group.items.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full border"
                      style={{ borderColor: `${accent}40`, color: '#334155', backgroundColor: '#f8fafc' }}
                    >
                      {skill}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-12">
          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-4 h-[2px]" style={{ backgroundColor: accent }} />
                Professional Experience
              </h2>
              <div className="space-y-8 pl-5 border-l-2" style={{ borderColor: `${accent}30` }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-white border-2" style={{ borderColor: accent }} />
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-800">{exp.position}</h3>
                      <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-500 rounded-full">
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: accent }}>{exp.company}</p>
                    {exp.description && (
                      <p className="text-[13px] leading-relaxed text-slate-600 font-medium">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-4 h-[2px]" style={{ backgroundColor: accent }} />
                Key Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 rounded-2xl border bg-slate-50 relative overflow-hidden" style={{ borderColor: '#f1f5f9' }}>
                    <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full" style={{ backgroundColor: `${accent}20` }} />
                    <h3 className="text-base font-bold text-slate-800">{proj.name}</h3>
                    <p className="text-xs mt-2 leading-relaxed text-slate-600 font-medium">{proj.description}</p>
                    {proj.technologies.length > 0 && (
                      <p className="text-[10px] font-black uppercase tracking-widest mt-4" style={{ color: accent }}>
                        {proj.technologies.join(' · ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-4 h-[2px]" style={{ backgroundColor: accent }} />
                Education
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {education.map((edu) => (
                  <div key={edu.id} className="p-6 rounded-2xl border" style={{ borderColor: `${accent}40`, backgroundColor: `${accent}05` }}>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">{edu.degree}</h3>
                    <p className="text-[13px] font-bold mt-1" style={{ color: accent }}>{edu.field}</p>
                    <p className="text-xs text-slate-600 font-medium mt-2">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t" style={{ borderColor: `${accent}20` }}>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                        {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                      </span>
                      {edu.gpa && <span className="text-[10px] font-bold" style={{ color: accent }}>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
