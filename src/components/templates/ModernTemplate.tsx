import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGlobe,
  FiExternalLink,
} from 'react-icons/fi';

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#6366f1';

  return (
    <div className="font-sans" style={{ backgroundColor: '#ffffff', color: '#1f2937', fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        className="px-10 py-8 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6"
        style={{ background: `linear-gradient(135deg, ${accent}, ${accent}dd)` }}
      >
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: '#ffffff' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.title && (
            <p className="text-lg mt-1 font-medium" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{personalInfo.title}</p>
          )}
          <div className="flex flex-wrap gap-4 mt-4 text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <FiMail size={13} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <FiPhone size={13} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <FiMapPin size={13} /> {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedIn && (
              <span className="flex items-center gap-1.5">
                <FiLinkedin size={13} /> LinkedIn
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <FiGlobe size={13} /> Portfolio
              </span>
            )}
          </div>
        </div>
        
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl shadow-lg border-2 shrink-0" 
            style={{ borderColor: 'rgba(255,255,255,0.2)' }}
          />
        )}
      </div>

      <div className="px-10 py-6 space-y-6">
        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#4b5563' }}>{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold" style={{ color: '#111827' }}>{exp.position || 'Position'}</h3>
                      <p className="text-sm" style={{ color: accent }}>
                        {exp.company || 'Company'}
                      </p>
                    </div>
                    <span className="text-xs whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
                      {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-1.5 leading-relaxed" style={{ color: '#4b5563' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold" style={{ color: '#111827' }}>
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-sm" style={{ color: accent }}>{edu.institution}</p>
                    {edu.gpa && <p className="text-xs" style={{ color: '#6b7280' }}>GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-xs whitespace-nowrap ml-4" style={{ color: '#6b7280' }}>
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Skills
            </h2>
            <div className="space-y-2">
              {skills.map((group) => (
                <div key={group.id} className="flex flex-wrap items-start gap-1">
                  {group.category && (
                    <span className="text-sm font-semibold mr-1" style={{ color: '#374151' }}>
                      {group.category}:
                    </span>
                  )}
                  {group.items.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs rounded-full"
                      style={{ backgroundColor: accent, color: '#ffffff' }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-3 pb-1 border-b-2"
              style={{ color: accent, borderColor: accent }}
            >
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold" style={{ color: '#111827' }}>{proj.name}</h3>
                    {proj.link && (
                      <FiExternalLink size={12} style={{ color: accent }} />
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-sm mt-1" style={{ color: '#4b5563' }}>{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-xs rounded border"
                          style={{ borderColor: `${accent}40`, color: accent }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages */}
        <div className="grid grid-cols-2 gap-6">
          {certifications.length > 0 && (
            <div>
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p className="text-sm font-medium" style={{ color: '#1f2937' }}>{cert.name}</p>
                    <p className="text-xs" style={{ color: '#6b7280' }}>
                      {cert.issuer} {cert.date && `• ${formatDate(cert.date)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2
                className="text-sm font-bold uppercase tracking-widest mb-2 pb-1 border-b-2"
                style={{ color: accent, borderColor: accent }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span style={{ color: '#1f2937' }}>{lang.language}</span>
                    <span style={{ color: '#6b7280' }}>{lang.proficiency}</span>
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
