/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME,
	QueryProductAttribute,
	ProductAttribute,
	WCDataSelector,
} from '@woocommerce/data';
import {
	__experimentalSelectControl as SelectControl,
	__experimentalSelectControlMenu as Menu,
	__experimentalSelectControlMenuItem as MenuItem,
} from '@woocommerce/components';

/**
 * Internal dependencies
 */
import { CreateAttributeModal } from './create-attribute-modal';

type AttributeInputFieldProps = {
	value?: ProductAttribute;
	onChange: (
		value?: Omit< ProductAttribute, 'position' | 'visible' | 'variation' >
	) => void;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	filteredAttributeIds?: number[];
};

export const AttributeInputField: React.FC< AttributeInputFieldProps > = ( {
	value,
	onChange,
	placeholder,
	label,
	disabled,
	filteredAttributeIds = [],
} ) => {
	const [ addNewAttributeName, setAddNewAttributeName ] =
		useState< string >();
	const { attributes, isLoading } = useSelect( ( select: WCDataSelector ) => {
		const { getProductAttributes, hasFinishedResolution } = select(
			EXPERIMENTAL_PRODUCT_ATTRIBUTES_STORE_NAME
		);
		return {
			isLoading: ! hasFinishedResolution( 'getProductAttributes' ),
			attributes: getProductAttributes(),
		};
	} );

	const getFilteredItems = (
		allItems: Pick< QueryProductAttribute, 'id' | 'name' >[],
		inputValue: string
	) => {
		const filteredItems = allItems.filter(
			( item ) =>
				filteredAttributeIds.indexOf( item.id ) < 0 &&
				( item.name || '' )
					.toLowerCase()
					.startsWith( inputValue.toLowerCase() )
		);
		if (
			inputValue.length > 0 &&
			! filteredItems.find(
				( item ) => item.name.toLowerCase() === inputValue.toLowerCase()
			)
		) {
			return [
				...filteredItems,
				{
					id: -99,
					name: inputValue,
				},
			];
		}
		return filteredItems;
	};
	const selected: Pick< QueryProductAttribute, 'id' | 'name' > | null = value
		? {
				id: value.id,
				name: value.name,
		  }
		: null;

	return (
		<>
			<SelectControl< Pick< QueryProductAttribute, 'id' | 'name' > >
				items={ attributes || [] }
				label={ label || '' }
				disabled={ disabled }
				getFilteredItems={ getFilteredItems }
				placeholder={ placeholder }
				getItemLabel={ ( item ) => item?.name || '' }
				getItemValue={ ( item ) => item?.id || '' }
				selected={ selected }
				onSelect={ ( attribute ) => {
					if ( attribute.id === -99 ) {
						setAddNewAttributeName( attribute.name );
						return;
					}
					onChange( {
						id: attribute.id,
						name: attribute.name,
						options: [],
					} );
				} }
				onRemove={ () => onChange() }
			>
				{ ( {
					items: renderItems,
					highlightedIndex,
					getItemProps,
					getMenuProps,
					isOpen,
				} ) => {
					return (
						<Menu getMenuProps={ getMenuProps } isOpen={ isOpen }>
							{ isLoading ? (
								<Spinner />
							) : (
								renderItems.map( ( item, index: number ) => (
									<MenuItem
										key={ item.id }
										index={ index }
										isActive={ highlightedIndex === index }
										item={ item }
										getItemProps={ getItemProps }
									>
										{ item.id === -99
											? sprintf(
													/* translators: The name of the new attribute to be created */
													__(
														'Create "%s"',
														'woocommerce'
													),
													item.name
											  )
											: item.name }
									</MenuItem>
								) )
							) }
						</Menu>
					);
				} }
			</SelectControl>
			{ addNewAttributeName && (
				<CreateAttributeModal
					initialAttributeName={ addNewAttributeName }
					onCancel={ () => setAddNewAttributeName( undefined ) }
					onCreated={ ( newAttribute ) => {
						onChange( {
							id: newAttribute.id,
							name: newAttribute.name,
							options: [],
						} );
						setAddNewAttributeName( undefined );
					} }
				/>
			) }
		</>
	);
};
