import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, DatePicker, Input, InputNumber, Select, Tooltip } from 'antd';
import { inputFieldTypes } from '.';

function Field({
  type,
  required,
  question,
  info,
  min,
  max,
  width,
  options,
  id,
  className,
  qno,
}) {
  return (
    <Col md={width} className={className}>
      <h6 className='text-base'>
        <span className='flex justify-between'>
          <span>
            {required && (
              <span className='text-red-500 font-semibold'>
                *
              </span>
            )}
            <span className='font-semibold'>Q {qno})</span>
            &nbsp;
            {question?.length > 0 ? question : 'Label'}
          </span>
          {info?.length > 0 && (
            <Tooltip title={info}>
              <InfoCircleOutlined />
            </Tooltip>
          )}
        </span>
      </h6>
      {(() => {
        switch (type) {
          case inputFieldTypes.text:
            return <Input />;
          case inputFieldTypes.number:
            return (
              <InputNumber
                type='number'
                style={{
                  width: '100%',
                }}
                min={Number(min)}
                max={Number(max)}
              />
            );
          case inputFieldTypes.date:
            return (
              <DatePicker
                style={{
                  width: '100%',
                }}
                disabledDate={(current) =>
                  current.isAfter(max) ||
                  current.isBefore(min)
                }
              />
            );
          case inputFieldTypes.dropdown:
            return (
              <Select
                style={{
                  width: '100%',
                }}
                options={options}
              />
            );
        }
      })()}
    </Col>
  );
}

export default Field;
