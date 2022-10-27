/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';
import { createElement } from 'react';
import { uploadMedia as wpUploadMedia } from '@wordpress/media-utils';

/**
 * Internal dependencies
 */
import type { FormFileUploadProps, WordPressComponentProps } from './types';

export function FormFileUpload( {
	accept,
	children,
	multiple = false,
	maxUploadFileSize = 10000000,
	onError = () => null,
	onUpload = () => null,
	onClick,
	render,
	uploadMedia = wpUploadMedia,
}: WordPressComponentProps< FormFileUploadProps, 'button', false > ) {
	const ref = useRef< HTMLInputElement >( null );
	const openFileDialog = () => {
		ref.current?.click();
	};

	const ui = render ? (
		render( { openFileDialog } )
	) : (
		<div
			className="woocommerce-form-file-upload"
			onKeyPress={ () => {} }
			tabIndex={ 0 }
			role="button"
			onClick={ (
				event: React.MouseEvent< HTMLDivElement, MouseEvent >
			) => {
				const { target } = event;
				if ( ( target as HTMLButtonElement )?.type !== 'button' ) {
					openFileDialog();
				}
			} }
			onBlur={ () => {} }
		>
			{ children }
		</div>
	);

	return (
		<div className="components-form-file-upload">
			{ ui }
			<input
				type="file"
				ref={ ref }
				multiple={ multiple }
				style={ { display: 'none' } }
				accept={ accept }
				onChange={ ( { target } ) => {
					uploadMedia( {
						filesList: target.files as FileList,
						onError,
						onFileChange: onUpload,
						maxUploadFileSize,
					} );
				} }
				onClick={ onClick }
				data-testid="form-file-upload-input"
			/>
		</div>
	);
}

export default FormFileUpload;
