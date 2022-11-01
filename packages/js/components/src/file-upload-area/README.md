# FileUploadArea

FileUploadArea is a component that allows users to set an area as clickable to upload files from their local device.

## Usage

```jsx
import { FileUploadArea } from '@wordpress/components';

const MyFileUploadArea = () => (
	<FileUploadArea
		accept="image/*"
		onUpload={ ( files ) => console.log( files ) }
	>
		Upload
	</FileUploadArea>
);
```

## Props

| Name       | Type      | Default      | Description                                                                                                                                             |
| ---------- | --------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accept`   | string    | `null`       | A string that is passed to the `input` element and tells the browser which file types can be uploaded by the user. e.g: `image/*,video/*`.              |
| `children` | ReactNode | `null`       | Children are passed as children of `div`.                                                                                                               |
| `multiple` | bool      | `null`       | Whether to allow multiple selection of files or not.                                                                                                    |
| `onError`  | Function  | `() => null` | Callback function to run when an error occurs                                                                                                           |
| `onUpload` | Function  | `() => null` | Callback function to run when an upload occurs aftering dragging and dropping files                                                                     |
| `render`   | function  | `null`       | Optional callback function used to render the UI. If passed, the component does not render the default UI (a div) and calls this function to render it. |
