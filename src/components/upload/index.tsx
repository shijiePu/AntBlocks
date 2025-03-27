import TechDragger from './components/dragger';
import Picture from './components/picture';
import InternalUpload from './instance';

type InternalUploadType = typeof InternalUpload;

export type TechDetailType = InternalUploadType & {
  Dragger: typeof TechDragger;
  Picture: typeof Picture;
};

const TechUpload = InternalUpload as TechDetailType;

TechUpload.Dragger = TechDragger;
TechUpload.Picture = Picture;

export default TechUpload;

//  TODO 添加single属性名称
