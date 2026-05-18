import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, status }) => {
  const variants = {
    'Open': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Closed': 'bg-slate-100 text-slate-700 border-slate-200',
    'default': 'bg-indigo-100 text-indigo-700 border-indigo-200'
  };

  const currentVariant = variants[status] || variants.default;

  return (
    <span className={twMerge(
      "px-2.5 py-0.5 rounded-full text-xs font-semibold border uppercase tracking-wider",
      currentVariant
    )}>
      {children}
    </span>
  );
};

export default Badge;
