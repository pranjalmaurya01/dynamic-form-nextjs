import {DatePicker, Form, Input, Slider, Switch} from 'antd';
import React from 'react';
import {inputFieldTypes, newQuestionConfigKeys} from '.';

function QuestionConfig({selectedType, onConfigChange}) {
	return (
		<>
			<h4 className='text-lg underline'>Question Configuration</h4>
			<br />
			<Form>
				<div className='grid grid-cols-2 gap-x-6'>
					<Form.Item label='Question Label'>
						<Input
							onChange={(e) =>
								onConfigChange(
									newQuestionConfigKeys.question,
									e.target.value
								)
							}
						/>
					</Form.Item>
					<Form.Item label='Info'>
						<Input
							onChange={(e) =>
								onConfigChange(
									newQuestionConfigKeys.info,
									e.target.value
								)
							}
						/>
					</Form.Item>
					<Form.Item label='Width'>
						<Slider
							min={2}
							max={24}
							step={2}
							defaultValue={6}
							onChange={(e) =>
								onConfigChange(newQuestionConfigKeys.width, e)
							}
						/>
					</Form.Item>
					<Form.Item label='Required'>
						<Switch
							onChange={(e) =>
								onConfigChange(
									newQuestionConfigKeys.required,
									e
								)
							}
						/>
					</Form.Item>
					{(() => {
						switch (selectedType) {
							case inputFieldTypes.number:
								return (
									<>
										<Form.Item label='Min Value'>
											<Input
												onChange={(e) =>
													onConfigChange(
														newQuestionConfigKeys.min,
														e.target.value
													)
												}
											/>
										</Form.Item>
										<Form.Item label='Max Value'>
											<Input
												onChange={(e) =>
													onConfigChange(
														newQuestionConfigKeys.min,
														e.target.value
													)
												}
											/>
										</Form.Item>
									</>
								);

							case inputFieldTypes.date:
								return (
									<>
										<Form.Item label='Min Date'>
											<DatePicker
												style={{width: '100%'}}
												onChange={(e) => {
													onConfigChange(
														newQuestionConfigKeys.min,
														e
													);
												}}
											/>
										</Form.Item>
										<Form.Item label='Max Date'>
											<DatePicker
												style={{width: '100%'}}
												onChange={(e) => {
													onConfigChange(
														newQuestionConfigKeys.min,
														e
													);
												}}
											/>
										</Form.Item>
									</>
								);
							default:
								return null;
						}
					})()}
				</div>
			</Form>
		</>
	);
}

export default QuestionConfig;
