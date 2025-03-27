import Group from './components/group';
import ItemRender from './components/item-render';
import Search from './components/search';
import InstanceForm from './instance';

type InternalTechFormType = typeof InstanceForm;

export type TechFormType = InternalTechFormType & {
  Search: typeof Search;
  Group: typeof Group;
  Item: typeof ItemRender;
};

const TechForm = InstanceForm as TechFormType;

TechForm.Search = Search;
TechForm.Group = Group;
TechForm.Item = ItemRender;

export default TechForm;
