/**
 * External dependencies
 */
import { render, screen } from '@testing-library/react';
import React, { createElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import FileUploadArea from '../file-upload-area';

describe( 'FileUploadArea', () => {
	it( 'should show a button and a hidden input', () => {
		render(
			<FileUploadArea>
				<button>My Upload Button</button>
			</FileUploadArea>
		);

		const button = screen.getByText( 'My Upload Button' );
		const input = screen.getByTestId( 'form-file-upload-input' );
		expect( button ).toBeInTheDocument();
		expect( input ).toHaveStyle( 'display: none' );
	} );
} );
