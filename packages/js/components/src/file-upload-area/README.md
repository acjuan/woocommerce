# FileUploadArea

FileUploadArea is a component that allows users to set an area as clickable to upload files from their local device.

## Usage

```jsx
import { FileUploadArea } from '@wordpress/components';

const MyFileUploadArea = () => (
	<FileUploadArea
		accept="image/*"
		onChange={ ( event ) => console.log( event.currentTarget.files ) }
	>
		Upload
	</FileUploadArea>
);
```

## Props

The component accepts the following props. Props not included in this set will be passed to the `Button` component.

### accept

A string passed to `input` element that tells the browser which file types can be upload to the upload by the user use. e.g: `image/*,video/*`.
More information about this string is available in https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers.

-   Type: `String`
-   Required: No

### children

Children are passed as children of `Button`.

-   Type: `Boolean`
-   Required: No

### multiple

Whether to allow multiple selection of files or not.

-   Type: `Boolean`
-   Required: No
-   Default: `false`

### onChange

Callback function passed directly to the `input` file element.

Select files will be available in `event.currentTarget.files`.

-   Type: `Function`
-   Required: Yes

```jsx
<FileUploadArea
	onClick={ ( event ) => ( event.target.value = '' ) }
	onChange={ onChange }
>
	Upload
</FileUploadArea>
```

-   Type: `Function`
-   Required: No

### render

Optional callback function used to render the UI. If passed, the component does not render the default UI (a button) and calls this function to render it. The function receives an object with property `openFileDialog`, a function that, when called, opens the browser native file upload modal window.

-   Type: `Function`
-   Required: No
