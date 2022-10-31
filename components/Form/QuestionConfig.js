import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
	Button,
	DatePicker,
	Form,
	Input,
	InputNumber,
	List,
	Slider,
	Switch,
	Tooltip
} from 'antd';
import React from 'react';
import { inputFieldTypes, newQuestionConfigKeys } from '.';

function QuestionConfig({
	selectedType,
	onConfigChange,
	onConfigChangeAddOptions,
	options,
}) {
	const [dropdownForm] = Form.useForm();
	return (
		<>
			<h4 className='text-lg underline'>Question Configuration</h4>
			<br />
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
							onConfigChange(newQuestionConfigKeys.required, e)
						}
					/>
				</Form.Item>
				{(() => {
					switch (selectedType) {
						case inputFieldTypes.number:
							return (
								<>
									<Form.Item label='Min Value'>
										<InputNumber
											style={{
												width: '100%',
											}}
											type='number'
											onChange={(e) =>
												onConfigChange(
													newQuestionConfigKeys.min,
													e
												)
											}
										/>
									</Form.Item>
									<Form.Item label='Max Value'>
										<InputNumber
											style={{
												width: '100%',
											}}
											type='number'
											onChange={(e) =>
												onConfigChange(
													newQuestionConfigKeys.max,
													e
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
											style={{ width: '100%' }}
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
											style={{ width: '100%' }}
											onChange={(e) => {
												onConfigChange(
													newQuestionConfigKeys.max,
													e
												);
											}}
										/>
									</Form.Item>
								</>
							);
						case inputFieldTypes.dropdown:
							return (
								<>
									<Form
										form={dropdownForm}
										onFinish={({ optionLabel }) => {
											onConfigChangeAddOptions(
												newQuestionConfigKeys.options,
												optionLabel,
												true
											);
											dropdownForm.resetFields();
										}}
									>
										<Form.Item
											label='Options'
											name='optionLabel'
											rules={[
												{
													required: true,
													message:
														'Please add an option before',
												},
											]}
										>
											<Input
												autoFocus
												addonAfter={
													<Tooltip title='add option'>
														<Button
															htmlType='submit'
															size='small'
															icon={
																<PlusOutlined />
															}
														/>
													</Tooltip>
												}
											/>
										</Form.Item>
									</Form>
									<span />
									<Form.Item label='Added Options'>
										<List
											className='flex-1'
											size='small'
											bordered
											dataSource={options}
											rowKey='id'
											renderItem={(item, i) => (
												<List.Item>
													<div className='flex-1'>
														{i + 1})&nbsp;
														{item.label}
													</div>
													<div>
														<Button
															onClick={() => {
																onConfigChangeAddOptions(
																	newQuestionConfigKeys.options,
																	item.id,
																	false
																);
															}}
															size='small'
															icon={
																<MinusOutlined size='small' />
															}
														/>
													</div>
												</List.Item>
											)}
										/>
									</Form.Item>
								</>
							);
						default:
							return null;
					}
				})()}
			</div>
		</>
	);
}

export default QuestionConfig;
