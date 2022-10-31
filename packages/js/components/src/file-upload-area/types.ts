/**
 * External dependencies
 */
import type { ComponentProps, InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@wordpress/components';
import {
	MediaItem,
	UploadMediaOptions,
	UploadMediaErrorCode,
} from '@wordpress/media-utils';

export type FileUploadAreaProps = {
	accept?: InputHTMLAttributes< HTMLInputElement >[ 'accept' ];
	children?: ReactNode;
	icon?: ComponentProps< typeof Icon >[ 'icon' ];
	multiple?: InputHTMLAttributes< HTMLInputElement >[ 'multiple' ];
	maxUploadFileSize?: number;
	onUpload?: ( files: MediaItem[] ) => void;
	onError?: ( error: {
		code: UploadMediaErrorCode;
		message: string;
		file: File;
	} ) => void;
	uploadMedia?: ( options: UploadMediaOptions ) => Promise< void >;
	onClick?: InputHTMLAttributes< HTMLInputElement >[ 'onClick' ];
	render?: ( arg: { openFileDialog: () => void } ) => ReactNode;
};
