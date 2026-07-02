import ProductPageLayout from './ProductPageLayout';
import { PageId } from '../../types';
import { PRODUCTS_DATA } from '../../data';

interface PageProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

const PRODUCT = PRODUCTS_DATA.find((p) => p.id === 'fertigation-system')!;

export default function FertigationSystemPage(props: PageProps) {
  return <ProductPageLayout product={PRODUCT} {...props} />;
}
