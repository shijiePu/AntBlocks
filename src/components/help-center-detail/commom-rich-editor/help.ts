export const isEditorEmpty = (value: any, text: any, limitNum: any) => {

  if (!text) return [''];
  // if (limitNum && text?.length > limitNum) {
  //   message.error(`超出${limitNum}字数限制`);
  //   return [value, ''];
  // }

  return [value];
};
