import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface TemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#111827';

  return (
    <div
      className="px-10 py-8"
      style={{ backgroundColor: '#ffffff', color: '#1f2937', fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* Header — clean and centered */}
      <div className="text-center mb-8 pb-6 border-b flex flex-col items-center" style={{ borderColor: '#e5e7eb' }}>
        {personalInfo.photoUrl && (
          <img 
            src={personalInfo.photoUrl} 
            alt="Profile" 
            className="w-24 h-24 rounded-full object-cover mb-4" 
          />
        )}
        <h1 className="text-3xl font-light tracking-wide" style={{ color: '#111827' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {personalInfo.title && (
          <p className="text-sm mt-1.5 tracking-wider uppercase" style={{ color: '#6b7280' }}>{personalInfo.title}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs" style={{ color: '#9ca3af' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && (personalInfo.phone || personalInfo.location || personalInfo.totalExperience) && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && (personalInfo.location || personalInfo.totalExperience) && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.totalExperience && <span>•</span>}
          {personalInfo.totalExperience && <span>{personalInfo.totalExperience} Exp.</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-1 text-xs" style={{ color: '#9ca3af' }}>
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.linkedIn && personalInfo.website && <span>•</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-7">
          <p className="text-sm leading-relaxed text-center max-w-[550px] mx-auto" style={{ color: '#4b5563' }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-7">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: accent }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>{exp.position}</h3>
                  <span className="text-[11px]" style={{ color: '#9ca3af' }}>
                    {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-sm mt-0.5" style={{ color: '#6b7280' }}>{exp.company}</p>
                {exp.description && (
                  <p className="text-[13px] mt-2 leading-relaxed" style={{ color: '#4b5563' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-7">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: accent }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-sm" style={{ color: '#6b7280' }}>{edu.institution}</p>
                  {edu.gpa && <p className="text-xs" style={{ color: '#9ca3af' }}>GPA: {edu.gpa}</p>}
                </div>
                <span className="text-[11px] whitespace-nowrap ml-4" style={{ color: '#9ca3af' }}>
                  {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-7">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: accent }}
          >
            Skills
          </h2>
          <div className="space-y-2">
            {skills.map((group) => (
              <div key={group.id} className="text-sm">
                {group.category && (
                  <span className="font-medium" style={{ color: '#374151' }}>{group.category}: </span>
                )}
                <span style={{ color: '#6b7280' }}>{group.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-7">
          <h2
            className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-4"
            style={{ color: accent }}
          >
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <h3 className="text-sm font-semibold" style={{ color: '#111827' }}>{proj.name}</h3>
                {proj.description && (
                  <p className="text-[13px] mt-1" style={{ color: '#4b5563' }}>{proj.description}</p>
                )}
                {proj.technologies.length > 0 && (
                  <p className="text-xs mt-1" style={{ color: '#9ca3af' }}>
                    {proj.technologies.join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom row: Certifications + Languages */}
      {(certifications.length > 0 || languages.length > 0) && (
        <div className="grid grid-cols-2 gap-8 pt-4 border-t" style={{ borderColor: '#f3f4f6' }}>
          {certifications.length > 0 && (
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: accent }}
              >
                Certifications
              </h2>
              <div className="space-y-1.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-sm">
                    <p className="font-medium" style={{ color: '#1f2937' }}>{cert.name}</p>
                    <p className="text-xs" style={{ color: '#9ca3af' }}>
                      {cert.issuer} {cert.date && `· ${formatDate(cert.date)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {languages.length > 0 && (
            <div>
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: accent }}
              >
                Languages
              </h2>
              <div className="space-y-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-sm">
                    <span style={{ color: '#374151' }}>{lang.language}</span>
                    <span style={{ color: '#9ca3af' }}>{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
