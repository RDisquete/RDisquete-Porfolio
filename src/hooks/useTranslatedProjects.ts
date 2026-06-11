import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { PROJECTS } from '../data/projectsData';
import type { Proyecto } from '../data/projectsData';

const projectKeyMap: Record<string, string> = {
  'Wedding Album System': 'weddingAlbum',
  'skyRESERVE': 'skyRESERVE',
  'The Pueblo': 'thePueblo',
  'Nor3xtrem': 'nor3xtrem',
  'Armario Escénico': 'armarioEscenico',
  'Infra.RD': 'infraRD',
  'Matter & Sound': 'matterSound',
  'ED Movil': 'edMovil',
  'AM Movil Repair': 'amMovilRepair',
  'Web RDisquete Photo': 'rdisquetePhoto',
};

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
