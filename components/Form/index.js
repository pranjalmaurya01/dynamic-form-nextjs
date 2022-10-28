import {InfoCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, Card, Col, Divider, Form, Input, Row, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {v4 as generate_id} from 'uuid';
import QuestionConfig from './QuestionConfig';
import SelectQueType from './SelectQueType';

export const inputFieldTypes = {
	text: 'text',
	number: 'number',
	date: 'date',
	dropdown: 'dropdown',
};

export const newQuestionConfigKeys = {
	required: 'required',
	question: 'question',
	info: 'info',
	answer: 'answer',
	min: 'min',
	max: 'max',
	width: 'width',
};

const initialState = {
	new: {status: false, config: null},
	questions: [],
};

export default function FormComp() {
	const [state, setState] = useState(initialState);

	const showInputOptions = () => {
		setState((prev) => ({
			...prev,
			new: {status: true, config: null},
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
			new: {status: false, config},
		}));
	};

	const onConfigChange = (changedProp, newValue) => {
		setState((prev) => ({
			...prev,
			new: {
				...prev.new,
				config: {...prev.new.config, [changedProp]: newValue},
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
											rules={[
												{
													required:
														state.new.config
															.required,
													message:
														'Please input your username!',
												},
											]}
											name='previewQuestion'
											label={
												state.new.config.question ??
												'Label'
											}
										>
											<Input
												addonAfter={
													state.new.config.info && (
														<Tooltip
															title={
																state.new.config
																	.info
															}
														>
															<InfoCircleOutlined />
														</Tooltip>
													)
												}
											/>
										</Form.Item>
									</Form>
								</Col>
							</Row>
						</div>
						<Divider />
						<QuestionConfig
							onConfigChange={onConfigChange}
							selectedType={state.new.config.type}
						/>
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
