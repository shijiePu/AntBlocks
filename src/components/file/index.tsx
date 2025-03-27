import TechFileItem from './file-item';
import TechFileList from './list';
export type TechFileDataType = {
  List: typeof TechFileList;
  Item: typeof TechFileItem;
};

const TechFile = {} as TechFileDataType;

TechFile.List = TechFileList;
TechFile.Item = TechFileItem;

export default TechFile;
