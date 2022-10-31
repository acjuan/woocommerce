/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { createElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FileUploadArea from '../file-upload-area';

/**
 * Browser dependencies
 */
const { File } = window;

// @testing-library/user-event considers changing <input type="file"> to a string as a change, but it do not occur on real browsers, so the comparisons will be against this result
const fakePath = expect.objectContaining( {
	target: expect.objectContaining( {
		value: 'C:\\fakepath\\hello.png',
	} ),
} );

describe( 'FileUploadArea', () => {
	beforeEach( () => {
		jest.useFakeTimers();
	} );

	afterEach( () => {
		jest.runOnlyPendingTimers();
		jest.useRealTimers();
	} );

	it( 'should show a button and a hidden input', () => {
		render(
			<FileUploadArea onUpload={ () => {} }>
				<button>My Upload Button</button>
			</FileUploadArea>
		);

		const button = screen.getByText( 'My Upload Button' );
		const input = screen.getByTestId( 'form-file-upload-input' );
		expect( button ).toBeInTheDocument();
		expect( input ).toHaveStyle( 'display: none' );
	} );

	it( 'should not fire a change event after selecting the same file', async () => {
		const user = userEvent.setup( {
			advanceTimers: jest.advanceTimersByTime,
		} );

		const onChange = jest.fn();

		render(
			<FileUploadArea onUpload={ onChange }>
				My Upload Button
			</FileUploadArea>
		);

		const file = new File( [ 'hello' ], 'hello.png', {
			type: 'image/png',
		} );

		const input = screen.getByTestId( 'form-file-upload-input' );

		await user.upload( input, file );

		await user.upload( input, file );

		expect( onChange ).toHaveBeenCalledTimes( 1 );
		expect( onChange ).toHaveBeenCalledWith( fakePath );
	} );

	it( 'should fire a change event after selecting the same file if the value was reset in between', async () => {
		const user = userEvent.setup( {
			advanceTimers: jest.advanceTimersByTime,
		} );

		const onChange = jest.fn();

		render(
			<FileUploadArea
				onClick={ jest.fn( ( e ) => ( e.currentTarget.value = '' ) ) }
				onChange={ onChange }
			>
				My Upload Button
			</FileUploadArea>
		);

		const file = new File( [ 'hello' ], 'hello.png', {
			type: 'image/png',
		} );

		const input = screen.getByTestId( 'form-file-upload-input' );
		await user.upload( input, file );

		expect( onChange ).toHaveBeenNthCalledWith( 1, fakePath );

		await user.upload( input, file );

		expect( onChange ).toHaveBeenNthCalledWith( 2, fakePath );
	} );
} );
