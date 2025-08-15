import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tone?: 'purple' | 'indigo' | 'green';
}

const bgByTone = {
  purple: 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50',
  indigo: 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50',
  green: 'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50',
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, tone = 'purple' }) => {
  return (
    <div className={`${bgByTone[tone]} backdrop-blur-sm rounded-2xl p-6 border`}>
      <div className="w-12 h-12 bg-white/60 dark:bg-slate-900/30 rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{desc}</p>
    </div>
  );
};

export default FeatureCard;
