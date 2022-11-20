import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Divider, message, Row, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as generate_id } from 'uuid';
import Field from './Field';
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
	options: 'options',
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
			new: { status: true, config },
		}));
	};

	const onConfigChange = (changedProp, newValue) => {
		setState((prev) => ({
			...prev,
			new: {
				...prev.new,
				config: { ...prev.new.config, [changedProp]: newValue },
			},
		}));
	};

	const onConfigChangeAddOptions = (changedProp, newValueOrId, append) => {
		switch (changedProp) {
			case newQuestionConfigKeys.options:
				if (append) {
					const newOption = {
						id: generate_id(),
						label: newValueOrId,
						value: newValueOrId,
					};
					setState((prev) => ({
						...prev,
						new: {
							...prev.new,
							config: {
								...prev.new.config,
								options: [
									...prev.new.config.options,
									newOption,
								],
							},
						},
					}));
				} else {
					setState((prev) => ({
						...prev,
						new: {
							...prev.new,
							config: {
								...prev.new.config,
								options: prev.new.config.options.filter(
									(each) => each.id !== newValueOrId
								),
							},
						},
					}));
				}

				break;
		}
	};

	const addQuestion = () => {
		if (!state.new.config.question) {
			return message.error('Please add a title for your question');
		}

		setState((prev) => ({
			...prev,
			new: { status: false, config: null },
			questions: [...prev.questions, prev.new.config],
		}));
	};

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<>
			<div>
				<h1 className='font-semibold text-2xl text-center'>
					Dynamic Form
				</h1>
			</div>
			{state.new.status && !state.new.config && (
				<SelectQueType addNewConfig={addNewConfig} />
			)}
			{state.new.status && !!state.new.config && (
				<div className='mx-10'>
					<Card
						size='small'
						title={`Step-2 ${state.new.config.type}`}
					>
						<div>
							<h4 className='text-lg underline'>Preview</h4>
							<br />
							<Row >
								<Field {...state.new.config} />
							</Row>
						</div>
						<Divider />
						<QuestionConfig
							onConfigChange={onConfigChange}
							selectedType={state.new.config.type}
							options={state.new.config.options}
							onConfigChangeAddOptions={onConfigChangeAddOptions}
						/>
					</Card>
				</div>
			)}
			<br />
			<div className='flex justify-end mr-5'>
				<div>
					{!state.new.status && (
						<Tooltip title='Add New'>
							<Button
								type='primary'
								icon={<PlusOutlined />}
								onClick={showInputOptions}
							/>
						</Tooltip>
					)}
					{state.new.config && (
						<Button onClick={addQuestion}>Add Question</Button>
					)}
					{state.questions.length > 0 && <Button>Clear Form</Button>}
				</div>
			</div>
			<br />
			<br />
			{state.questions.length > 0 && (
				<div className='mx-10'>
					<h4 className='text-lg underline text-center'>
						Added Questions
					</h4>
					<br />
					<Row
						gutter={[16, 16]}
					>
						{state.questions.map((eachQuestion, i) => (
							<Field
								qno={i + 1}
								{...eachQuestion}
								key={eachQuestion.id}
							/>
						))}
					</Row>
				</div>
			)}
		</>
	);
}
