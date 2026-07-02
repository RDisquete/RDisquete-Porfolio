import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../data/projectsData';
import type { Proyecto } from '../data/projectsData';
import { projectKeyMap } from '../data/projectKeys';

export function useTranslatedProjects(): Proyecto[] {
  const { t } = useTranslation();

  return useMemo(() => PROJECTS.map(p => {
    const key = projectKeyMap[p.title];
    if (!key) return p;
    return {
      ...p,
      title: t(`projects.${key}.title`),
      desc: t(`projects.${key}.desc`),
      context: t(`projects.${key}.context`),
      problem: t(`projects.${key}.problem`),
      solution: p.solution.map((_, i) => t(`projects.${key}.solution.${i}`)),
      result: t(`projects.${key}.result`),
      impact: p.impact ? t(`projects.${key}.impact`) : undefined,
    };
  }), [t]);
}
