/**
 * External dependencies
 */
import { useRef } from '@wordpress/element';
import { createElement } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import {
	MediaItem,
	UploadMediaOptions,
	UploadMediaErrorCode,
	uploadMedia as wpUploadMedia,
} from '@wordpress/media-utils';

type FileUploadAreaProps = {
	accept?: InputHTMLAttributes< HTMLInputElement >[ 'accept' ];
	children?: ReactNode;
	multiple?: InputHTMLAttributes< HTMLInputElement >[ 'multiple' ];
	maxUploadFileSize?: number;
	onError?: ( error: {
		code: UploadMediaErrorCode;
		message: string;
		file: File;
	} ) => void;
	onUpload?: ( files: MediaItem[] ) => void;
	render?: ( arg: { openFileDialog: () => void } ) => ReactNode;
	uploadMedia?: ( options: UploadMediaOptions ) => Promise< void >;
};

export function FileUploadArea( {
	accept,
	children,
	multiple = false,
	maxUploadFileSize = 10000000,
	onError = () => null,
	onUpload = () => null,
	render,
	uploadMedia = wpUploadMedia,
}: FileUploadAreaProps ) {
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
				data-testid="form-file-upload-input"
			/>
		</div>
	);
}

export default FileUploadArea;
