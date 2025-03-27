import { Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';

const CustomRadio = (props: any) => {
  const { value, onChange, form, inputName } = props;

  const [radioData, setRadioData] = useState(value);

  useEffect(() => {
    setRadioData(value);
  }, [value]);

  const handleRadioChange = (e: any) => {
    const data = e.target.value;

    onChange(data);
    setRadioData(data);

    if (data === 'NO') {
      form.setFieldValue(inputName, '');
    }
  };

  return (
    <>
      <Radio.Group
        style={{ marginBottom: '10px' }}
        value={radioData}
        onChange={handleRadioChange}
      >
        <Radio value={'YES'}>
          是<br />
        </Radio>
        <Radio value={'NO'}>否</Radio>
      </Radio.Group>

      {radioData === 'YES' && (
        <Form.Item name={inputName} noStyle>
          <Input placeholder="请输入"></Input>
        </Form.Item>
      )}
    </>
  );
};

export default CustomRadio;
