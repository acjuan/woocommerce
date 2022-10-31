/**
 * External dependencies
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { createElement } from 'react';

/**
 * Internal dependencies
 */
import FileUploadArea from '../file-upload-area';

const Template: ComponentStory< typeof FileUploadArea > = ( props ) => {
	return <FileUploadArea { ...props } />;
};

export const Default = Template.bind( {} );
Default.args = {
	children: 'Select a file',
};

export const RestrictFileTypes = Template.bind( {} );
RestrictFileTypes.args = {
	...Default.args,
	accept: 'image/*',
	children: 'Select an image',
};

export const AllowMultipleFiles = Template.bind( {} );
AllowMultipleFiles.args = {
	...Default.args,
	children: 'Select multiple files',
	multiple: true,
};

export const WithCustomRender = Template.bind( {} );
WithCustomRender.args = {
	...Default.args,
	render: ( { openFileDialog } ) => (
		<button onClick={ openFileDialog }>Custom Upload Button</button>
	),
};

const meta: ComponentMeta< typeof FileUploadArea > = {
	title: 'WooCommerce Admin/components/FileUploadArea',
	component: FileUploadArea,
};
export default meta;
