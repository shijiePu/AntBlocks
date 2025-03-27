import DetailGroup from './components/group';
import DetailItem from './components/item-render';
import DetailInstance from './instance';
type InternalDetailType = typeof DetailInstance;

export type TechDetailType = InternalDetailType & {
  Group: typeof DetailGroup;
  Item: typeof DetailItem;
};

const TechDetail = DetailInstance as TechDetailType;

TechDetail.Group = DetailGroup;
TechDetail.Item = DetailItem;

export default TechDetail;
