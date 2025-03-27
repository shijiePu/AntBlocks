export type LoadingSizeType = 'small' | 'middle' | 'large';

export interface TechLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: LoadingSizeType;
  className?: string;
}
