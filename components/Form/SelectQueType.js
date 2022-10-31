import {Button, Card} from 'antd';
import React from 'react';
import {inputFieldTypes} from '.';

function SelectQueType({addNewConfig}) {
	return (
		<div className='mx-10'>
			<Card size='small' title='Step-1'>
				<div className='grid grid-cols-4 gap-10'>
					<Button
						type='primary'
						onClick={() => addNewConfig(inputFieldTypes.text)}
					>
						Text
					</Button>
					<Button
						type='primary'
						onClick={() => addNewConfig(inputFieldTypes.number)}
					>
						Number
					</Button>
					<Button
						type='primary'
						onClick={() => addNewConfig(inputFieldTypes.date)}
					>
						Date
					</Button>
					<Button
						type='primary'
						onClick={() => addNewConfig(inputFieldTypes.dropdown)}
					>
						DropDown
					</Button>
				</div>
			</Card>
		</div>
	);
}

export default SelectQueType;
