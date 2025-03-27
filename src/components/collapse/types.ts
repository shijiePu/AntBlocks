export interface TechCollapseProps {
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  onExpand?: (collapse: boolean) => void;
}
