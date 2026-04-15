import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils/helpers';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGlobe } from 'react-icons/fi';

interface TemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#1e3a5f';

  return (
    <div style={{ background: `linear-gradient(to right, ${accent} 220px, #ffffff 220px)`, color: '#1f2937', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <div className="flex">
        {/* Sidebar */}
        <div
          className="w-[220px] min-h-full px-6 py-8 shrink-0"
          style={{ backgroundColor: 'transparent', color: '#ffffff' }}
        >
          {/* Photo */}
          {personalInfo.photoUrl && (
            <div className="mb-8 flex justify-center">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 shadow-xl" 
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              />
            </div>
          )}

          {/* Contact */}
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
              Contact
            </h2>
            <div className="space-y-4 text-sm break-all font-medium">
              {personalInfo.email && (
                <div className="flex items-center gap-3">
                  <FiMail className="shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={16} />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-3">
                  <FiPhone className="shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={16} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-3">
                  <FiMapPin className="shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={16} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.totalExperience && (
                <div className="flex items-center gap-3">
                  <span className="shrink-0 text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>EXP</span>
                  <span>{personalInfo.totalExperience}</span>
                </div>
              )}
              {personalInfo.linkedIn && (
                <div className="flex items-center gap-3">
                  <FiLinkedin className="shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={16} />
                  <span>{personalInfo.linkedIn}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-3">
                  <FiGlobe className="shrink-0" style={{ color: 'rgba(255, 255, 255, 0.6)' }} size={16} />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                Skills
              </h2>
              <div className="space-y-3">
                {skills.map((group) => (
                  <div key={group.id}>
                    {group.category && (
                      <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {group.category}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed">{group.items.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                Languages
              </h2>
              <div className="space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <span className="font-medium">{lang.language}</span>
                    {lang.proficiency && (
                      <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}> — {lang.proficiency}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 border-b pb-2" style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}>
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="text-xs break-inside-avoid">
                    <p className="font-medium">{cert.name}</p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {cert.issuer} {cert.date && `• ${formatDate(cert.date)}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-8 py-8">
          {/* Name + Title */}
          <div className="mb-6 border-b-2 pb-4" style={{ borderColor: accent }}>
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: accent }}>
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.title && (
              <p className="text-base mt-1 italic" style={{ color: '#6b7280' }}>{personalInfo.title}</p>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] mb-2"
                style={{ color: accent }}
              >
                Profile
              </h2>
              <p className="text-sm leading-relaxed italic" style={{ color: '#4b5563' }}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: accent }}
              >
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 border-l-2 break-inside-avoid" style={{ borderColor: `${accent}30` }}>
                    <div
                      className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[5px]"
                      style={{ backgroundColor: accent }}
                    />
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold" style={{ color: '#111827' }}>{exp.position}</h3>
                        <p className="text-sm italic" style={{ color: '#6b7280' }}>{exp.company}</p>
                      </div>
                      <span className="text-xs whitespace-nowrap ml-4" style={{ color: '#9ca3af' }}>
                        {formatDate(exp.startDate)} — {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: '#4b5563' }}>{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-6">
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: accent }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start break-inside-avoid">
                    <div>
                      <h3 className="font-bold" style={{ color: '#111827' }}>
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-sm italic" style={{ color: '#6b7280' }}>{edu.institution}</p>
                      {edu.gpa && <p className="text-xs" style={{ color: '#9ca3af' }}>GPA: {edu.gpa}</p>}
                    </div>
                    <span className="text-xs whitespace-nowrap ml-4" style={{ color: '#9ca3af' }}>
                      {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
                style={{ color: accent }}
              >
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="break-inside-avoid">
                    <h3 className="font-bold" style={{ color: '#111827' }}>{proj.name}</h3>
                    {proj.description && (
                      <p className="text-sm mt-1" style={{ color: '#4b5563' }}>{proj.description}</p>
                    )}
                    {proj.technologies.length > 0 && (
                      <p className="text-xs mt-1 italic" style={{ color: '#9ca3af' }}>
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
    </div>
  );
}
