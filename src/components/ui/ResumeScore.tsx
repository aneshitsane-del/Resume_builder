'use client';

import React, { useState, useEffect } from 'react';
import { ResumeData } from '@/types/resume';
import { calculateScore, ScoreResult } from '@/utils/scoring';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

interface ResumeScoreProps {
  data: ResumeData;
}

export default function ResumeScore({ data }: ResumeScoreProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState<ScoreResult>({ totalScore: 0, breakdown: [] });

  useEffect(() => {
    // Recalculate anytime data changes
    setResult(calculateScore(data));
  }, [data]);

  const score = result.totalScore;
  let color = 'text-red-500';
  let stroke = '#ef4444';
  if (score >= 80) {
    color = 'text-green-500';
    stroke = '#22c55e';
  } else if (score >= 50) {
    color = 'text-amber-500';
    stroke = '#f59e0b';
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
        title="View ATS Score Analysis"
      >
        <div className="relative w-7 h-7">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-slate-700"
              strokeWidth="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              strokeWidth="3"
              strokeDasharray={`${score}, 100`}
              strokeLinecap="round"
              stroke={stroke}
              fill="none"
              className="transition-all duration-1000 ease-out"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-[9px] font-bold ${color}`}>{score}</span>
          </div>
        </div>
        <span className="text-sm font-semibold text-slate-300 hidden sm:inline">Score</span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-slate-900 border border-white/10 shadow-2xl rounded-2xl overflow-hidden relative print:hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-start bg-slate-800/50">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Resume ATS Score</h2>
                <p className="text-sm text-slate-400">Based on standard HR formatting and optimization rules.</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-4">
              
              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className={`text-6xl font-black mb-1 ${color}`}>{score}</div>
                  <div className="text-sm font-medium tracking-widest text-slate-400 uppercase">Out of 100</div>
                </div>
              </div>

              {result.breakdown.map((item) => {
                const isPerfect = item.actualScore === item.maxScore;
                const isZero = item.actualScore === 0;

                return (
                  <div key={item.id} className="p-4 bg-white/5 border border-white/5 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        {isPerfect ? (
                          <FiCheckCircle className="text-green-500" />
                        ) : isZero ? (
                          <FiAlertCircle className="text-red-500" />
                        ) : (
                          <FiInfo className="text-amber-500" />
                        )}
                        <span className="font-semibold text-slate-200">{item.label}</span>
                      </div>
                      <span className="text-sm font-bold bg-slate-950 px-2.5 py-1 rounded-md text-slate-300">
                        {item.actualScore} / {item.maxScore}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {item.suggestion}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 bg-slate-950 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close & Improve
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
