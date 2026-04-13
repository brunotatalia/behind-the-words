import type { Category } from '@/types/question';

export interface CategoryInfo {
  id: Category;
  label: string;
  icon: string;
  color: string;
}

export const categories: CategoryInfo[] = [
  { id: 'tone-disconnect', label: 'שמח בחוץ, עצוב בפנים', icon: '🎭', color: '#f59e0b' },
  { id: 'misunderstood-romance', label: 'זה לא אהבה', icon: '💔', color: '#ef4444' },
  { id: 'historical-political', label: 'היסטוריה ופוליטיקה', icon: '🌍', color: '#3b82f6' },
  { id: 'drug-references', label: 'בין השורות', icon: '💊', color: '#8b5cf6' },
  { id: 'biographical', label: 'סיפורים אמיתיים', icon: '📖', color: '#22c55e' },
  { id: 'translation-barriers', label: 'אבד בתרגום', icon: '🌐', color: '#06b6d4' },
];

export function getCategoryInfo(id: Category): CategoryInfo {
  return categories.find(c => c.id === id)!;
}
