export type TagVariant = 'default' | 'important';

export interface TagProps {
  label: string;
  variant?: TagVariant;
}
