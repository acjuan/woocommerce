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

// TODO: Replace `children` and `icon` types with props from Button once Button is typed.
export type FormFileUploadProps = {
	/**
	 * A string passed to `input` element that tells the browser which file types can be
	 * upload to the upload by the user use. e.g: `image/*,video/*`.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers.
	 */
	accept?: InputHTMLAttributes< HTMLInputElement >[ 'accept' ];
	/**
	 * Children are passed as children of `Button`.
	 */
	children?: ReactNode;
	/**
	 * The icon to render in the `Button`.
	 */
	icon?: ComponentProps< typeof Icon >[ 'icon' ];
	/**
	 * Whether to allow multiple selection of files or not.
	 */
	multiple?: InputHTMLAttributes< HTMLInputElement >[ 'multiple' ];
	/**
	 * Callback function passed directly to the `input` file element.
	 *
	 * Select files will be available in `event.currentTarget.files`.
	 */
	// onChange: InputHTMLAttributes< HTMLInputElement >[ 'onChange' ];

	maxUploadFileSize?: number;
	onUpload?: ( files: MediaItem[] ) => void;
	onError?: ( error: {
		code: UploadMediaErrorCode;
		message: string;
		file: File;
	} ) => void;
	uploadMedia?: ( options: UploadMediaOptions ) => Promise< void >;

	/**
	 * Callback function passed directly to the `input` file element.
	 *
	 * This can be useful when you want to force a `change` event to fire when
	 * the user chooses the same file again. To do this, set the target value to
	 * an empty string in the `onClick` function.
	 *
	 * ```jsx
	 * <FormFileUpload
	 * 	onClick={ ( event ) => ( event.target.value = '' ) }
	 * 	onChange={ onChange }
	 * >
	 * 	Upload
	 * </FormFileUpload>
	 * ```
	 */
	onClick?: InputHTMLAttributes< HTMLInputElement >[ 'onClick' ];
	/**
	 * Optional callback function used to render the UI.
	 *
	 * If passed, the component does not render the default UI (a button) and
	 * calls this function to render it. The function receives an object with
	 * property `openFileDialog`, a function that, when called, opens the browser
	 * native file upload modal window.
	 */
	render?: ( arg: { openFileDialog: () => void } ) => ReactNode;
};

// Based on https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/types.ts
export type WordPressComponentProps<
	/** Prop types. */
	P,
	/** The HTML element to inherit props from. */
	T extends React.ElementType,
	/** Supports polymorphism through the `as` prop. */
	IsPolymorphic extends boolean = true
> = P &
	// The `children` prop is being explicitly omitted since it is otherwise implicitly added
	// by `ComponentPropsWithRef`. The context is that components should require the `children`
	// prop explicitely when needed (see https://github.com/WordPress/gutenberg/pull/31817).
	Omit< React.ComponentPropsWithoutRef< T >, 'as' | keyof P | 'children' > &
	( IsPolymorphic extends true
		? {
				/** The HTML element or React component to render the component as. */
				as?: T | keyof JSX.IntrinsicElements;
		  }
		: Record< string, unknown > );
// : Record< string, unknown > ) & {
// maxUploadFileSize?: number;
// onUpload?: ( files: MediaItem[] ) => void;
// onError?: ( error: {
// 	code: UploadMediaErrorCode;
// 	message: string;
// 	file: File;
// } ) => void;
// uploadMedia?: ( options: UploadMediaOptions ) => Promise< void >;
// };
