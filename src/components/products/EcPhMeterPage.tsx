import ProductPageLayout from './ProductPageLayout';
import { PageId } from '../../types';
import { PRODUCTS_DATA } from '../../data';

interface PageProps {
  onNavigate: (pageId: PageId) => void;
  onSelectProductForEnquiry: (productName: string) => void;
}

const PRODUCT = PRODUCTS_DATA.find((p) => p.id === 'ec-ph-meter')!;

export default function EcPhMeterPage(props: PageProps) {
  return <ProductPageLayout product={PRODUCT} {...props} />;
}
