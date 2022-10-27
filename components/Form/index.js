import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Slider,
  Tooltip
} from 'antd';
import { useEffect, useState } from 'react';
import { v4 as generate_id } from 'uuid';
import SelectQueType from './SelectQueType';

export const inputFieldTypes = {
  text: 'text',
  number: 'number',
  date: 'date',
  dropdown: 'dropdown',
};

const initialState = {
  new: { status: false, config: null },
  questions: [],
};

export default function FormComp() {
  const [state, setState] = useState(initialState);

  const showInputOptions = () => {
    setState((prev) => ({
      ...prev,
      new: { status: true, config: null },
    }));
  };

  const addNewConfig = (selectedInputType) => {
    let config = {
      id: generate_id(),
      type: selectedInputType,
      required: false,
      width: 6,
      question: null,
      info: null,
      answer: null,
      min: null,
      max: null,
      options_answer: [],
      options: [],
    };
    setState((prev) => ({
      ...prev,
      new: { status: false, config },
    }));
  };

  const onWidthChange = (e) => {
    setState((prev) => ({
      ...prev,
      new: {
        ...prev.new,
        config: { ...prev.new.config, width: e },
      },
    }));
  };

  const onQuestionChange = (e) => {
    setState((prev) => ({
      ...prev,
      new: {
        ...prev.new,
        config: { ...prev.new.config, question: e.target.value },
      },
    }));
  };

  useEffect(() => {
    console.log(state.new.config);
  }, [state]);

  return (
    <>
      <div>
        <h1 className='font-semibold text-2xl text-center'>
          Dynamic Form
        </h1>
      </div>
      {state.new.status && <SelectQueType addNewConfig={addNewConfig} />}
      {!state.new.status && !!state.new.config && (
        <div className='mx-10'>
          <Card
            size='small'
            title={`Step-2 ${state.new.config.type}`}
          >
            <div className=''>
              <h4 className='text-lg underline'>Preview</h4>
              <br />
              <Row>
                <Col md={state.new.config.width}>
                  <Form>
                    <Form.Item
                      label={
                        state.new.config.question ??
                        'Label'
                      }
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </div>
            <Divider />
            <div>
              <br />
              <h4 className='text-lg underline'>Question Configuration</h4>
              <br />
              <Form>
                <Form.Item label='Question Label'>
                  <Input onChange={onQuestionChange} />
                </Form.Item>
                <Form.Item label='Width'>
                  <Slider
                    min={2}
                    max={24}
                    step={2}
                    defaultValue={6}
                    onChange={onWidthChange}
                  />
                </Form.Item>
              </Form>
            </div>
          </Card>
        </div>
      )}

      <br />
      <div className='flex justify-end mr-5'>
        <div>
          <Tooltip title='Add Next Element'>
            <Button
              type='primary'
              icon={<PlusOutlined />}
              onClick={showInputOptions}
            />
          </Tooltip>
          <Divider />
          <Button>Clear Form</Button>
        </div>
      </div>
    </>
  );
}

// className = {`grid grid-cols-${12 / state.new.config.width}`}
