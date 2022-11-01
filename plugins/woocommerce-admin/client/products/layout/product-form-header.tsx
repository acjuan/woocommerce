/**
 * Internal dependencies
 */
import { ProductFormActions } from '../product-form-actions';
import { ProductStatusBadge } from '../product-status-badge';
import { ProductTitle } from '../product-title';

export const ProductFormHeader: React.FC = () => {
	return (
		<>
			<ProductTitle />
			<ProductFormActions />
		</>
	);
};
