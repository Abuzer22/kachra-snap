import { CATEGORY_LABEL, toApplicationCategory } from '../constants/categories';
import { usePreferences } from '../context/PreferencesContext';
import { t } from '../i18n/translations';

const colors = {
  recyclable: 'bg-sage text-forest',
  organic: 'bg-[#EAF2E5] text-[#4A6B3A]',
  ewaste: 'bg-[#E8EEF5] text-[#365A7A]',
  unknown: 'bg-[#F5EDE3] text-warning',
};

export default function CategoryBadge({ category, className = '' }) {
  const { prefs } = usePreferences();
  const normalized = toApplicationCategory(category);
  const label = t(prefs.language, 'category_' + normalized);
  const fallback = CATEGORY_LABEL[normalized] || category;
  return (
    <span
      className={
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ' +
        (colors[normalized] || 'bg-offwhite text-secondary') +
        ' ' +
        className
      }
    >
      {label === 'category_' + category ? fallback : label}
    </span>
  );
}