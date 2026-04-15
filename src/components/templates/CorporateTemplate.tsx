import React from 'react';
import { ResumeData } from '@/types/resume';
import { formatDate } from '@/utils/helpers';

interface TemplateProps {
  data: ResumeData;
}

export default function CorporateTemplate({ data }: TemplateProps) {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  const accent = data.accentColor || '#1d4ed8'; // Blue default

  const firstName = personalInfo.fullName.split(' ')[0] || '';
  const lastName = personalInfo.fullName.split(' ').slice(1).join(' ') || '';

  return (
    <div className="font-sans" style={{ backgroundColor: '#ffffff', color: '#111827', fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      
      {/* HEADER */}
      <div className="px-10 pt-12 pb-8 flex flex-row justify-between items-start gap-8">
        {/* Left: Name and Title */}
        <div className="w-[60%]">
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight leading-none mb-3">
            <span style={{ color: accent }}>{firstName}</span> <span className="text-slate-900">{lastName}</span>
          </h1>
          {personalInfo.title && (
            <p className="text-sm font-bold uppercase tracking-wider text-slate-700 leading-relaxed max-w-sm">
              {personalInfo.title}
            </p>
          )}
        </div>

        {/* Right: Contact Details Stack */}
        <div className="w-[40%] text-xs font-semibold text-slate-800 space-y-2">
          {personalInfo.phone && (
            <div className="flex items-start">
              <span className="w-24 shrink-0 uppercase tracking-wider">Phone</span>
              <span className="mx-2 px-px" style={{ color: accent }}>|</span>
              <span className="flex-1">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.email && (
            <div className="flex items-start">
              <span className="w-24 shrink-0 uppercase tracking-wider">Email</span>
              <span className="mx-2 px-px" style={{ color: accent }}>|</span>
              <span className="flex-1 break-all">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-start">
              <span className="w-24 shrink-0 uppercase tracking-wider">Location</span>
              <span className="mx-2 px-px" style={{ color: accent }}>|</span>
              <span className="flex-1">{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.totalExperience && (
            <div className="flex items-start">
              <span className="w-24 shrink-0 uppercase tracking-wider">Experience</span>
              <span className="mx-2 px-px" style={{ color: accent }}>|</span>
              <span className="flex-1">{personalInfo.totalExperience}</span>
            </div>
          )}
        </div>
      </div>

      {/* BODY - Split Layout */}
      <div className="flex flex-row px-10 pb-10 gap-10">
        
        {/* LEFT SIDEBAR */}
        <div className="w-[32%] shrink-0 space-y-8" style={{ borderTop: `4px solid ${accent}`, paddingTop: '24px' }}>
          
          {/* Photo (Optional but supported) */}
          {personalInfo.photoUrl && (
            <div className="mb-8">
              <img 
                src={personalInfo.photoUrl} 
                alt="Profile" 
                className="w-32 h-32 rounded-xl object-cover border shadow-sm" 
              />
            </div>
          )}

          {/* Key Skills */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 tracking-tight">Key Skills</h2>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                {skills.map((group) => (
                  <React.Fragment key={group.id}>
                    {group.items.map((skill, i) => (
                      <div key={i} className="flex relative">
                        <span className="absolute left-0 text-[10px] mt-[1px]" style={{ color: '#475569' }}>•</span>
                        <span className="pl-4">{skill}</span>
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 tracking-tight">Certification</h2>
              <div className="space-y-3 text-xs text-slate-700 font-medium pl-1">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex relative">
                    <span className="absolute left-0 text-[10px] mt-[1px]" style={{ color: '#475569' }}>•</span>
                    <div className="pl-4">
                      <span className="font-semibold text-slate-800">{cert.name}</span>
                      {cert.issuer && <span> — {cert.issuer}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 tracking-tight">Languages</h2>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium pl-1">
                {languages.map((lang) => (
                  <div key={lang.id} className="flex relative">
                    <span className="absolute left-0 text-[10px] mt-[1px]" style={{ color: '#475569' }}>•</span>
                    <span className="pl-4">{lang.language}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Links */}
          {(personalInfo.linkedIn || personalInfo.website) && (
            <div>
              <h2 className="text-base font-bold text-slate-900 mb-3 tracking-tight">Social links</h2>
              <div className="space-y-2 text-[11px] text-slate-700 font-medium pl-1 break-all">
                {personalInfo.linkedIn && (
                  <div className="flex relative">
                    <span className="absolute left-0 text-[10px] mt-[1px]" style={{ color: '#475569' }}>•</span>
                    <span className="pl-4">{personalInfo.linkedIn.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
                {personalInfo.website && (
                  <div className="flex relative">
                    <span className="absolute left-0 text-[10px] mt-[1px]" style={{ color: '#475569' }}>•</span>
                    <span className="pl-4">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT MAIN BODY */}
        <div className="flex-1 space-y-8" style={{ paddingTop: '24px' }}>
          
          {/* Profile Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-[17px] font-bold text-slate-900 mb-2 tracking-tight">Profile Summary</h2>
              <p className="text-xs leading-[1.6] text-slate-800 font-medium text-justify">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Work Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Work Experience</h2>
              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="pl-3 relative break-inside-avoid" style={{ borderLeft: `3px solid ${accent}` }}>
                    <h3 className="text-sm font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {exp.company}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2 mt-0.5">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </p>
                    {exp.description && (
                      <p className="text-xs leading-[1.6] text-slate-700 font-medium">
                        {exp.description}
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
              <h2 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Education</h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="pl-3 relative break-inside-avoid" style={{ borderLeft: `3px solid ${accent}` }}>
                    <h3 className="text-sm font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-[13px] font-semibold text-slate-700 mt-0.5">
                      {edu.institution}
                    </p>
                    <div className="flex gap-4 mt-1">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                        {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                      </p>
                      {edu.gpa && (
                        <p className="text-[10px] font-bold" style={{ color: accent }}>
                          GPA: {edu.gpa}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-[17px] font-bold text-slate-900 mb-3 tracking-tight">Projects</h2>
              <div className="space-y-5">
                {projects.map((proj) => (
                  <div key={proj.id} className="pl-3 relative break-inside-avoid" style={{ borderLeft: `3px solid ${accent}` }}>
                    <h3 className="text-sm font-bold text-slate-900">{proj.name}</h3>
                    {proj.description && (
                      <p className="text-xs leading-[1.6] text-slate-700 font-medium mt-1.5">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies.length > 0 && (
                      <p className="text-[10px] tracking-wider font-bold text-slate-500 mt-2">
                        Tech Stack: <span style={{ color: accent }}>{proj.technologies.join(', ')}</span>
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
