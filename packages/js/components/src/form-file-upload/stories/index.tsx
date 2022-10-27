/**
 * External dependencies
 */
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { upload as uploadIcon } from '@wordpress/icons';
import React, { createElement } from 'react';

/**
 * Internal dependencies
 */
import FormFileUpload from '../form-file-upload';

const Template: ComponentStory< typeof FormFileUpload > = ( props ) => {
	return <FormFileUpload { ...props } />;
};

export const Default = Template.bind( {} );
Default.args = {
	children: 'Select file',
};

export const RestrictFileTypes = Template.bind( {} );
RestrictFileTypes.args = {
	...Default.args,
	accept: 'image/*',
	children: 'Select image',
};

export const AllowMultipleFiles = Template.bind( {} );
AllowMultipleFiles.args = {
	...Default.args,
	children: 'Select files',
	multiple: true,
};

export const WithIcon = Template.bind( {} );
WithIcon.args = {
	...Default.args,
	children: 'Upload',
	icon: uploadIcon,
};

/**
 * Render a custom trigger button by passing a render function to the `render` prop.
 *
 * ```jsx
 * ( { openFileDialog } ) => <button onClick={ openFileDialog }>Custom Upload Button</button>
 * ```
 */
export const WithCustomRender = Template.bind( {} );
WithCustomRender.args = {
	...Default.args,
	render: ( { openFileDialog } ) => (
		<button onClick={ openFileDialog }>Custom Upload Button</button>
	),
};

const meta: ComponentMeta< typeof FormFileUpload > = {
	title: 'WooCommerce Admin/components/FormFileUpload',
	component: FormFileUpload,
};
export default meta;
